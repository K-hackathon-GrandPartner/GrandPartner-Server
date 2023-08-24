import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

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

export class RegionsQueryDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  readonly regions: string[];
}

export class BuildingTypesQueryDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  readonly buildingTypes: string[];
}
