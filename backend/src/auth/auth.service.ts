import { HttpException, Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.dto';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialLogin } from './entities/social_login.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SocialLogin)
    private readonly socialLoginRepository: Repository<SocialLogin>,
  ) {}

  async login(data: LoginRequestDto) {
    const { accessToken, loginType } = data;
    let userId;
    switch (loginType) {
      case 'kakao':
        userId = await this.getUserIdByKakaoToken(accessToken);
        break;
      case 'phone':
        //userId = await this.getUserIdByPhoneNumber(accessToken);
        break;
      default:
        break;
    }
    return userId;
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
    const userId = await this.getUserFindById(user.data.id);
    console.log(userId);
  }

  async getUserFindById(id: number): Promise<any> {
    const user = await this.socialLoginRepository.findOne({ where: { id } });
    console.log(user);
  }
}
