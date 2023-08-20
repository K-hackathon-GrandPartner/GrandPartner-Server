import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

const allowedRegions = ['광진구', '노원구', '성북구']; // 허용할 지역 목록

export class RegionsQueryDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  readonly regions: string[];
}
