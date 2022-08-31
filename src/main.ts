import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remueve las propiedades extra en los dto enviados desde front
      // forbidNonWhitelisted: true, tira error para propiedades extra en los dto
    }),
  );
  await app.listen(3000);
}
bootstrap();
