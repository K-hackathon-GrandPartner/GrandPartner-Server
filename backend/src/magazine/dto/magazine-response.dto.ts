import { ApiProperty } from '@nestjs/swagger';

export class MagazinesResponseDto {
  @ApiProperty({ description: '매거진 ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '매거진 이미지 URL',
    example:
      'https://storage.cloud.google.com/grand-partner-bucket/magazines/magazine-1-1',
  })
  imageUrl: string;
}

export class MagazineResponseDto extends MagazinesResponseDto {
  @ApiProperty({
    description: '매거진 내용',
    example:
      '정정옥 어르신, 송예지 학생\n\nQ. 자기소개 부탁드려요.\n\n정정옥: 노원구...',
  })
  content: string;
}
