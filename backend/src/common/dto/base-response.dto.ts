export class BaseResponseDto {
  success(result?: any) {
    return {
      statusCode: 200,
      message: '성공',
      result: result,
    };
  }
}
