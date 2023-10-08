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
    example: '장동호',
  })
  name: string;

  @ApiProperty({
    description: '임대인 소개',
    example: '안녕하세요 장동호입니다.',
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
  id: number;

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
}

export class LandRordProfileDto extends LandRordResponseDto {
  @ApiProperty({
    description: '임대인 리뷰',
    example: [
      {
        id: 1,
        profileImageUrl: 'https://...',
        name: '장동호',
        rating: 4.5,
        content: '방이 너무 좋아요',
        postDate: '2021-08-01',
        updateDate: '2021-08-01',
      },
      {
        id: 2,
        profileImageUrl: 'https://...',
        name: '장동호',
        rating: 4.5,
        content: '방이 너무 좋아요',
        postDate: '2021-08-01',
        updateDate: '2021-08-01',
      },
    ],
  })
  reviews: ReviewDto[];
}
