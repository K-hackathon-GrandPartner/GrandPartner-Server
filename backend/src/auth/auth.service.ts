import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.dto';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialLogin } from './entities/social_login.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { formatSex } from 'src/room/utils/format';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SocialLogin)
    private readonly socialLoginRepository: Repository<SocialLogin>,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginRequestDto) {
    const { accessToken: kakaoAccessToken, loginType } = data;
    let userId;
    switch (loginType) {
      case 'kakao':
        userId = await this.getUserIdByKakaoToken(kakaoAccessToken);
        break;
      case 'phone':
        //userId = await this.getUserIdByPhoneNumber(accessToken);
        break;
      default:
        break;
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(userId),
      this.generateRefreshToken(userId),
    ]);

    return accessToken;
  }

  async generateAccessToken(userId: number): Promise<any> {
    return this.jwtService.signAsync(
      { user_id: userId },
      {
        secret: 'process.env.JWT_SECRET_KEY',
        expiresIn: '2h',
        subject: 'access_token',
      },
    );
  }

  async generateRefreshToken(userId: number): Promise<any> {
    return this.jwtService.signAsync(
      { user_id: userId },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '14d',
        subject: 'refresh_token',
      },
    );
  }

  private async getUserIdByKakaoToken(accessToken: string): Promise<any> {
    let user;
    try {
      user = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      throw new HttpException('유효하지 않은 액세스 토큰입니다.', 400);
    }
    const userData = await this.getUserFindByExternalId(user.data.id);
    if (!userData || !userData.userId) {
      if (!userData) await this.createSocialLogin(user.data.id, 1);
      throw new HttpException(
        {
          statusCode: HttpStatus.CREATED,
          message: '유저가 존재하지 않습니다. 회원가입을 진행해주세요.',
          result: {
            externalId: user.data.id,
            nickname: user.data.kakao_account.profile.nickname,
            profileImage: user.data.kakao_account.profile.profile_image_url,
            gender: formatSex(user.data.kakao_account.gender),
          },
        },
        HttpStatus.CREATED,
      );
    }
    return userData.userId;
  }

  async getUserFindByExternalId(id: number): Promise<any> {
    const user = await this.socialLoginRepository
      .createQueryBuilder('social_login')
      .where('social_login.externalId = :id', { id })
      .getOne();
    if (user) {
      return user;
    }
  }

  async updateUserByExternalId(
    externalId: number,
    userId: number,
  ): Promise<any> {
    const user = await this.socialLoginRepository
      .createQueryBuilder()
      .update()
      .set({ userId: userId })
      .where('externalId = :externalId', {
        externalId: externalId,
      })
      .execute();
    return user;
  }

  private async createSocialLogin(
    externalId: string,
    socialCode: number,
  ): Promise<any> {
    const user = await this.socialLoginRepository.save({
      externalId: externalId,
      socialCode: socialCode,
    });
    return user;
  }

  async deleteSocialLoginUser(userId: number) {
    try {
      const deleteUser = await this.socialLoginRepository
        .createQueryBuilder()
        .delete()
        .from(SocialLogin)
        .where('userId = :userId', { userId })
        .execute();
    } catch (err) {
      throw new HttpException('유효하지 않은 유저입니다.', 400);
    }
  }
}
