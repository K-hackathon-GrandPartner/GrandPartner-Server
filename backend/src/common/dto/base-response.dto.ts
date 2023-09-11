import { IsInt, IsString } from 'class-validator';

export class ResponseDto {
  @IsInt()
  statusCode: number;

  @IsString()
  message: string;

  result: any; // 또는 원하는 타입으로 지정

  constructor(statusCode: number, message: string, result: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.result = result;
  }
}
