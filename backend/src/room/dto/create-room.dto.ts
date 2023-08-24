import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: '방 사진(base64)',
    type: 'string[]',
    // base64
    example: [
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwk',
    ],
  })
  images: string[];

  @ApiProperty({
    description: '보증금(만원)',
    type: 'number',
    example: 500,
  })
  deposit: number;

  @ApiProperty({
    description: '월세(만원)',
    type: 'number',
    example: 30,
  })
  monthlyRent: number;

  @ApiProperty({
    description: '건물 유형',
    type: 'string',
    example: '아파트',
  })
  buildingType: string;

  @ApiProperty({
    description: '건물 층 수',
    type: 'number',
    example: 3,
  })
  buildingFloor: number;

  @ApiProperty({
    description: '방 층 수',
    type: 'number',
    example: 3,
  })
  roomFloor: number;

  @ApiProperty({
    description: '방 크기(m^2)',
    type: 'number',
    example: 16.5,
  })
  roomSize: number;

  @ApiProperty({
    description: '입주 가능 날짜',
    type: 'string',
    example: '8월 중순 가능',
  })
  moveInDate: string;

  @ApiProperty({
    description: '방 옵션',
    type: 'string[]',
    example: ['에어컨', '욕실', '침대'],
  })
  roomOptions: string[];

  @ApiProperty({
    description: '귀가 시간',
    type: 'number',
    example: 22,
  })
  commuteTime: number;

  @ApiProperty({
    description: '흡연 여부',
    type: 'boolean',
    example: false,
  })
  smoking: boolean;

  @ApiProperty({
    description: '음주 여부',
    type: 'boolean',
    example: false,
  })
  drinking: boolean;

  @ApiProperty({
    description: '종교 여부',
    type: 'string',
    example: '개신교',
  })
  religion: string;

  @ApiProperty({
    description: '돌봄 서비스',
    type: 'string[]',
    example: ['주 1회 장보기', '월 2회 외출 도움'],
  })
  careServices: string[];

  @ApiProperty({
    description: '안전 정보',
    type: 'string[]',
    example: ['CCTV', '화재 경보기'],
  })
  safetyFacilities: string[];

  @ApiProperty({
    description: '반려 동물 여부',
    type: 'string[]',
    example: ['강아지', '고양이'],
  })
  pets: string[];

  @ApiProperty({
    description: '방 제목',
    type: 'string',
    example: '방 제목',
  })
  title: string;

  @ApiProperty({
    description: '방 상세 설명',
    type: 'string',
    example: '방 상세 설명',
  })
  description: string;
}
