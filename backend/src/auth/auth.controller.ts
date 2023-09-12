import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/base-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인 API' })
  async login(@Body() data: LoginRequestDto): Promise<ResponseDto> {
    const result = await this.authService.login(data);
    return new ResponseDto(200, '성공', result);
  }
}
