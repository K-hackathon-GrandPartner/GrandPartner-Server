import { ApiProperty } from '@nestjs/swagger';

export class RoomResponseDto {
  @ApiProperty({ description: '썸네일 이미지 URL' })
  imageUrl: string;

  @ApiProperty({
    description: '방 제목',
    type: 'string',
    example: '아파트 · 큰 방',
  })
  title: string;

  @ApiProperty({ description: '방 크기(m^2)', type: 'number', example: 45.6 })
  roomSize: number;

  @ApiProperty({ description: '방 층수', type: 'number', example: 3 })
  roomFloor: number;

  @ApiProperty({ description: '보증금(만원)', type: 'number', example: 300 })
  deposit: number;

  @ApiProperty({ description: '월세(만원)', type: 'number', example: 50 })
  monthlyRent: number;

  @ApiProperty({ description: '주소(구, 동)', example: '강남구 역삼동' })
  address: string;

  @ApiProperty({
    description: '상세 설명 일부',
    example: '건국대 도보 5분 거리, 즉시 입주 가능.',
  })
  content: string;
}
