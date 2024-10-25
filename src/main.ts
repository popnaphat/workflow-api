import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: 'http://localhost:4200',  // ระบุ origin ที่อนุญาต
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // อนุญาตให้ส่ง cookies
  });
  await app.listen(3000);
}
bootstrap();
