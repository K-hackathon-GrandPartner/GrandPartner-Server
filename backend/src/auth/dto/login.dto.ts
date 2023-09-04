import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: 'Se07A0t99EsY6DCFAjpp7Zqxff6W1lG1oj1xzKDGCioljwAAAYpea4sR',
    description: '액세스 토큰',
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    example: 'kakao',
    description: '로그인 유형',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['kakao', 'phone'])
  loginType: string;
}
