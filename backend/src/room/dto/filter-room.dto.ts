import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';

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
  startDeposit: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  endDeposit: number = 100000;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  startMonthlyRent: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  endMonthlyRent: number = 100000;

  @IsOptional()
  @IsArray()
  regions: string[] = allowedRegions;

  @IsOptional()
  @IsArray()
  buildingTypes: string[] = allowedBuildingTypes;

  @IsOptional()
  @IsArray()
  roomSizeTypes: string[] = allowedRoomSizeTypes;

  @IsOptional()
  @IsArray()
  roomOptions: string[] = [];
}
