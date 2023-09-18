import { ApiHeader, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

const allowedRegions = ['광진구', '노원구', '성북구']; // 허용할 지역 목록
const allowedBuildingTypes = ['아파트', '오피스텔', '빌라', '단독 주택']; // 허용할 건물 유형 목록
const allowedRoomSizeTypes = ['소형', '중형', '대형', '대형+']; // 허용할 방 유형 목록
const allowedRoomOptions = [
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

export class RoomFilterDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: '보증금(만원) 시작 범위',
    example: 0,
    required: false,
  })
  startDeposit: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: '보증금(만원) 끝 범위',
    example: 1000,
    required: false,
  })
  endDeposit: number = 100000;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: '월세(만원) 시작 범위',
    example: 0,
    required: false,
  })
  startMonthlyRent: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: '월세(만원) 끝 범위',
    example: 100,
    required: false,
  })
  endMonthlyRent: number = 100000;

  @IsOptional()
  @IsString({ each: true })
  @IsIn(allowedRegions, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @ApiProperty({
    description: '지역',
    required: false,
  })
  regions: string[] = allowedRegions;

  @IsOptional()
  @IsString({ each: true })
  @IsIn(allowedBuildingTypes, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @ApiProperty({
    description: '건물 유형',
    required: false,
  })
  buildingTypes: string[] = allowedBuildingTypes;

  @IsOptional()
  @IsString({ each: true })
  @IsIn(allowedRoomSizeTypes, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @ApiProperty({
    description: '방 크기',
    required: false,
  })
  roomSizeTypes: string[] = allowedRoomSizeTypes;

  @IsOptional()
  @IsString({ each: true })
  @IsIn(allowedRoomOptions, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @ApiProperty({
    description: '방 옵션',
    required: false,
  })
  roomOptions: string[] = [];
}
