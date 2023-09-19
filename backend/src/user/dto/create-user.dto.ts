import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '유저 식별번호',
    example: '3003974792',
  })
  @IsNotEmpty()
  externalId: number;

  @ApiProperty({
    description: '유저 로그인 타입',
    example: 'kakao',
  })
  @IsNotEmpty()
  loginType: string;

  @ApiProperty({
    description: '유저 이름',
    example: '장동호',
  })
  name: string;

  @ApiProperty({
    description: '유저 성별',
    example: '남자',
  })
  sex: string;

  @ApiProperty({
    description: '유저 전화번호',
    example: '010-1234-5678',
  })
  cellPhone: string;

  @ApiProperty({
    description: '유저 패스워드',
    example: '!@#qwer1234',
  })
  password?: string;

  @ApiProperty({
    description: '유저 생일',
    example: '2000-12-18',
  })
  birth: string;

  @ApiProperty({
    description: '유저 마케팅 수신 동의 여부',
  })
  marketingConsent: boolean = false;

  @ApiProperty({
    description: '유저 프로필 이미지',
    example:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwk',
  })
  profileImage?: string;

  @ApiProperty({
    description: '유저 소개',
    example: '안녕하세요. 장동호입니다.',
  })
  introduction?: string;

  @ApiProperty({
    description: '유저 종교',
    example: '없음',
  })
  @IsIn(['천주교', '불교', '개신교', '없음'])
  religion?: string = '없음';

  @ApiProperty({
    description: '유저 대학교',
    example: '서울대학교',
  })
  university: string;

  @ApiProperty({
    description: '유저 재학증명서',
    example:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwk',
  })
  enrollmentVerification: string;
}
