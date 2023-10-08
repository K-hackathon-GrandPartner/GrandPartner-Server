import { ApiProperty } from '@nestjs/swagger';

export class LandRordResponseDto {
  @ApiProperty({ description: '임대인 ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '임대인 프로필 사진 URL',
    example: 'https://...',
  })
  profileImageUrl: string;

  @ApiProperty({
    description: '임대인 이름',
    example: '김덕배',
  })
  name: string;

  @ApiProperty({
    description: '임대인 소개',
    example: '안녕하세요 김덕배입니다.',
  })
  introduction: string;

  @ApiProperty({
    description: '임대인 평점',
    example: 4.5,
  })
  rating: number;

  @ApiProperty({
    description: '임대인 리뷰 개수',
    example: '10',
  })
  reviewCount: number;
}

export class ReviewDto {
  @ApiProperty({ description: '임차인 ID', example: 1 })
  lesseeId: number;

  @ApiProperty({
    description: '임차인 프로필 사진 URL',
    example: 'https://...',
  })
  profileImageUrl: string;

  @ApiProperty({
    description: '임차인 이름',
    example: '장동호',
  })
  name: string;

  @ApiProperty({
    description: '평점',
    example: 4.5,
  })
  rating: number;

  @ApiProperty({
    description: '리뷰 내용',
    example: '방이 너무 좋아요',
  })
  content: string;

  @ApiProperty({
    description: '리뷰 작성 날짜',
    example: '2021-08-01',
  })
  postDate: string;

  @ApiProperty({
    description: '리뷰 수정 날짜',
    example: '2021-08-01',
  })
  updateDate: string;
}

export class LandRordProfileDto extends LandRordResponseDto {
  @ApiProperty({
    description: '임대인 리뷰',
    type: ReviewDto,
  })
  review: ReviewDto;
}
