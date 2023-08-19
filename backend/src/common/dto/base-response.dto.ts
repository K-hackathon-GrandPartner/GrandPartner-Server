export class BaseResponseDto {
  success(data: any, message = '성공', statusCode = 200) {
    return {
      statusCode: statusCode,
      message: message,
      data: data,
    };
  }
}
