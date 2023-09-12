import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  NotExistUserResponseDto,
} from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/base-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인 API' })
  @ApiResponse({
    status: 200,
    description: '유저 정보가 이미 DB에 존재하고, 로그인에 성공',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '유저 정보가 DB에 존재하지 않음',
    type: NotExistUserResponseDto,
  })
  async login(@Body() data: LoginRequestDto): Promise<ResponseDto> {
    const result = await this.authService.login(data);
    console.log(result);
    return new ResponseDto(200, '성공', result);
  }
}
