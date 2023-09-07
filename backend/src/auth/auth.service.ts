import { HttpException, Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.dto';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialLogin } from './entities/social_login.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

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
    // TODO: JWT 토큰 발급
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(userId),
      this.generateRefreshToken(userId),
    ]);
    console.log(accessToken, refreshToken);
    return userId;
  }

  protected async generateAccessToken(userId: number): Promise<any> {
    return this.jwtService.signAsync(
      { user_id: userId },
      {
        expiresIn: '1h',
        subject: 'access_token',
      },
    );
  }

  protected async generateRefreshToken(userId: number): Promise<any> {
    return this.jwtService.signAsync(
      { user_id: userId },
      {
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
    if (!userData) return; // TODO: 회원가입 로직 추가
    return userData.userId;
  }

  private async getUserFindByExternalId(id: number): Promise<any> {
    const user = await this.socialLoginRepository
      .createQueryBuilder('social_login')
      .where('social_login.externalId = :id', { id })
      .getOne();
    if (user) {
      return user;
    }
  }
}
