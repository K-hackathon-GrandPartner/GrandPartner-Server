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

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'JWT 토큰',
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}

// DB에 존재하지 않을 때
export class NotExistUserResponseDto {
  @ApiProperty({
    example: '3003974791',
    description: '유저 식별 ID',
  })
  @IsNotEmpty()
  @IsString()
  externalId: string;

  @ApiProperty({
    example: '장동호',
    description: '유저 닉네임',
  })
  @IsString()
  nickname?: string;

  @ApiProperty({
    example:
      'http://k.kakaocdn.net/dn/zRtbv/btsr0t2vJzM/lgslaKS2K018lkL4KkBW9K/m1.jpg',
    description: '유저 프로필 이미지',
  })
  @IsString()
  profileImage?: string;

  @ApiProperty({
    example: '남성',
    description: '유저 성별',
  })
  @IsString()
  gender?: string;
}
