import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

const buildingTypes = ['아파트', '빌라', '단독주택', '오피스텔'];
const roomOptions = [
  '욕실',
  '주방 공유',
  '침대',
  '세탁기 공유',
  '에어컨',
  '엘리베이터',
  '책상',
  '유료 주차',
  '무료 주차',
  '옷장',
  '무선 인터넷',
  'TV',
];

export class CreateRoomDto {
  @ApiProperty({
    description: '방 사진(base64)',
    type: 'string[]',
    // base64
    example: [
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwk',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({
    description: '보증금(만원)',
    type: 'number',
    example: 500,
  })
  @IsNumber()
  deposit: number;

  @ApiProperty({
    description: '월세(만원)',
    type: 'number',
    example: 30,
  })
  @IsNumber()
  monthlyRent: number;

  @ApiProperty({
    description: '건물 유형',
    type: 'string',
    example: '아파트',
  })
  @IsIn(buildingTypes)
  buildingType: string;

  @ApiProperty({
    description: '건물 층 수',
    type: 'number',
    example: 3,
  })
  @IsNumber()
  buildingFloor: number;

  @ApiProperty({
    description: '방 층 수',
    type: 'number',
    example: 3,
  })
  @IsNumber()
  roomFloor: number;

  @ApiProperty({
    description: '방 크기(m^2)',
    type: 'number',
    example: 16.5,
  })
  @IsNumber()
  roomSize: number;

  @ApiProperty({
    description: '입주 가능 날짜',
    type: 'string',
    example: '8월 중순 가능',
  })
  @IsString()
  moveInDate: string;

  @ApiProperty({
    description: '방 옵션',
    type: 'string[]',
    example: ['에어컨', '욕실', '침대'],
  })
  @IsOptional()
  @IsArray()
  @IsIn(roomOptions, { each: true })
  roomOptions: string[];

  @ApiProperty({
    description: '귀가 시간',
    type: 'number',
    example: 22,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  commuteTime: number = 0;

  @ApiProperty({
    description: '흡연 여부',
    type: 'boolean',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  smoking: boolean = false;

  @ApiProperty({
    description: '음주 여부',
    type: 'boolean',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  drinking: boolean = false;

  @ApiProperty({
    description: '종교 여부',
    type: 'string',
    example: '개신교',
    default: '상관 없음',
  })
  @IsOptional()
  @IsString()
  religion: string = '상관 없음';

  @ApiProperty({
    description: '돌봄 서비스',
    type: 'string[]',
    example: ['주 1회 장보기', '월 2회 외출 도움'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  careServices: string[];

  @ApiProperty({
    description: '안전 정보',
    type: 'string[]',
    example: ['CCTV', '화재 경보기'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  safetyFacilities: string[];

  @ApiProperty({
    description: '반려 동물 여부',
    type: 'string[]',
    example: ['강아지', '고양이'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pets: string[];

  @ApiProperty({
    description: '방 제목',
    type: 'string',
    example: '방 제목',
  })
  @IsString()
  @MaxLength(30)
  title: string;

  @ApiProperty({
    description: '방 상세 설명',
    type: 'string',
    example: '방 상세 설명',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;
}
