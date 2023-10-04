import { ApiOperation, ApiProperty } from '@nestjs/swagger';

export class RoomsResponseDto {
  @ApiProperty({ description: '방 ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '썸네일 이미지 URL',
    example:
      'https://storage.cloud.google.com/grand-partner-bucket/rooms/room-1-1',
  })
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

class CoordinateDto {
  @ApiProperty({ description: '주소 위도', example: 37.5466 })
  lat: number;

  @ApiProperty({ description: '주소 경도', example: 127.0713 })
  lng: number;
}

export class RoomResponseDto {
  @ApiProperty({ description: '방 ID', example: 13 })
  id: number;

  @ApiProperty({ description: '월세(만원)', example: 30 })
  monthlyRent: number;

  @ApiProperty({ description: '보증금(만원)', example: 500 })
  deposit: number;

  @ApiProperty({ description: '건물 유형', example: '단독주택' })
  buildingType: string;

  @ApiProperty({ description: '건물 층수', example: 3 })
  buildingFloor: number;

  @ApiProperty({ description: '방 층수', example: 3 })
  roomFloor: number;

  @ApiProperty({ description: '방 크기(m^2)', example: 15.23 })
  roomSize: number;

  @ApiProperty({ description: '방 크기(한글)', example: '중형' })
  roomSizeType: string;

  @ApiProperty({ description: '입주 가능일', example: '중순협의' })
  moveInDate: string;

  @ApiProperty({ description: '도로명 주소', example: '광진구 화양동' })
  address: string;

  @ApiProperty({ description: '좌표', type: CoordinateDto })
  coordinate: CoordinateDto;

  @ApiProperty({ description: '방 등록 날짜', example: '2023-08-17 08:28:03' })
  postDate: string;

  @ApiProperty({ description: '방 수정 날짜', example: '2023-08-19 14:24:55' })
  updateDate: string;

  @ApiProperty({
    description: '이미지 URL 목록',
    type: [String],
    example: ['https://image1.jpg', 'https://image2.jpg', 'https://image3.jpg'],
  })
  images: string[];

  @ApiProperty({
    description: '방 상세 정보',
    example: { title: '1번 글 제목', content: '1번 글 내용' },
  })
  detail: { title: string; content: string };

  @ApiProperty({
    description: '임대인 프로필',
    example: {
      userId: 48,
      profileImageUrl: 'https://test.jpg',
      name: '김덕배',
      rating: 4.5,
      reviewCount: 4,
    },
  })
  landlordProfile: {
    id: number;
    profileImageUrl: string;
    name: string;
    rating: number;
    reviewCount: number;
  };

  @ApiProperty({
    description: '방 옵션',
  })
  option: {
    bathroom: number;
    bed: number;
    airConditioner: number;
    desk: number;
    freeParking: number;
    wifi: number;
    kitchen: number;
    washer: number;
    elevator: number;
    paidParking: number;
    closet: number;
    tv: number;
  };

  @ApiProperty({
    description: '방 규칙',
  })
  rule: {
    curfew: number;
    smoking: number;
    drinking: number;
    religion: string;
  };

  @ApiProperty({
    description: '방 안전 시설',
  })
  safety: {
    cctv: number;
    fireExtinguisher: number;
    firstAidKit: number;
    fireAlarm: number;
    carbonMonoxideAlarm: number;
  };

  @ApiProperty({
    description: '반려동물',
  })
  pet: {
    dog: number;
    cat: number;
    etc: number;
  };

  @ApiProperty({
    description: '케어 서비스',
    type: [String],
    example: ['주 1회 청소', '주 1회 세탁', '주 1회 화장실 청소'],
  })
  careServices: string[];
}
