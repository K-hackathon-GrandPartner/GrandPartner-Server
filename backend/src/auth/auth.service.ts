import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginRequestDto } from './dto/login.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
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

  async getUserIdByKakaoToken(accessToken: string): Promise<string> {
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
    const { id } = user.data;
    return id;
  }
}
