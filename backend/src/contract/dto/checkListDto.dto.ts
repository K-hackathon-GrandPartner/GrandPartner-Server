import { ApiProperty } from '@nestjs/swagger';

export class CheckListDto {
  @ApiProperty({
    example: [
      '고양이 밥주기',
      '고양이 물주기',
      '고양이 산책시키기',
      '고양이 놀아주기',
    ],
    description: '체크리스트 - 월',
  })
  month?: string[];

  @ApiProperty({
    example: [
      '고양이 밥주기',
      '고양이 물주기',
      '고양이 산책시키기',
      '고양이 놀아주기',
    ],
    description: '체크리스트 - 주',
  })
  week?: string[];

  @ApiProperty({
    example: [
      '고양이 밥주기',
      '고양이 물주기',
      '고양이 산책시키기',
      '고양이 놀아주기',
    ],
    description: '체크리스트 - 일',
  })
  day?: string[];

  @ApiProperty({
    example: [
      '고양이 밥주기',
      '고양이 물주기',
      '고양이 산책시키기',
      '고양이 놀아주기',
    ],
    description: '체크리스트 - 미분류',
  })
  etc?: string[];
}
