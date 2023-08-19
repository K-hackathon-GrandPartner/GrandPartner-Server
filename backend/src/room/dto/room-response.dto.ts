import { ApiProperty } from '@nestjs/swagger';

export class RoomsResponseDto {
  @ApiProperty({ description: '방 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '썸네일 이미지 URL', example: 'https://...' })
  imageUrl: string;

  @ApiProperty({
    description: '건물 유형',
    example: '아파트',
  })
  buildingType: string;

  @ApiProperty({
    description: '방 크기(종류)',
    type: 'string',
    example: '중형',
  })
  roomSizeType: string;

  @ApiProperty({ description: '방 크기(m^2)', type: 'number', example: 16.5 })
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
    description: '방 제목',
    type: 'string',
    example: '건국대 도보 5분 거리, 즉시 입주 가능.',
  })
  title: string;

  @ApiProperty({
    description: '방 등록 날짜',
    type: 'string',
    example: '2023-08-17 08:28:03',
  })
  postDate: string;
}

export class RoomResponseDto {
  @ApiProperty({ description: '방 ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '이미지 URL들',
    example: [{ imageUrl: 'http://1' }],
  })
  images: string[];
}
