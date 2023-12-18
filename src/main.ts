import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        // If set to true class-transformer will attempt conversion based on TS reflected type
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3012);
}
bootstrap();
