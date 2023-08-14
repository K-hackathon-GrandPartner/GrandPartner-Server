import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // API 경로 설정
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
