import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  NotExistUserResponseDto,
} from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/base-response.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
    return new ResponseDto(200, '성공', result);
  }

  @Post('register')
  @ApiOperation({ summary: '회원가입 API' })
  @ApiResponse({
    status: 200,
    description: '회원가입 성공',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '회원가입 실패',
    content: {
      'application/json': {
        examples: {
          '이미 가입된 유저일 경우': {
            value: {
              statusCode: 400,
              message: '이미 가입된 유저입니다.',
            },
            description:
              '같은 소셜 로그인 타입의 유저가 회원가입을 한 기록이 있을 경우에 발생합니다. 로그인을 시도해주세요.',
          },
          '유효하지 않은 식별 ID일 경우': {
            value: {
              statusCode: 400,
              message: '유효하지 않은 식별 ID입니다.',
            },
            description:
              '소셜 로그인을 한 기록이 없는 유저가 회원가입을 시도할 경우에 발생합니다. 로그인을 시도해주세요.',
          },
        },
      },
    },
  })
  async register(@Body() data: CreateUserDto): Promise<any> {
    const isExist = await this.authService.getUserFindByExternalId(
      data.externalId,
    );
    if (!isExist) return new ResponseDto(400, '유효하지 않은 식별 ID입니다.');
    if (isExist.userId) return new ResponseDto(400, '이미 가입된 유저입니다.');
    //TODO: 회원가입 로직
    const result = await this.userService.createUser(data);
  }
}
