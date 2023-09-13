import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ResponseDto {
  @ApiProperty({
    description: '상태 코드',
    example: 200,
  })
  @IsInt()
  statusCode: number;

  @ApiProperty({
    description: '응답 메시지',
    example: '성공',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: '응답 결과',
    example: {},
  })
  result?: any; // 또는 원하는 타입으로 지정

  constructor(statusCode: number, message: string, result?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.result = result;
  }
}
