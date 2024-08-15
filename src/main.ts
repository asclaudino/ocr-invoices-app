import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'https://file-uploader-tawny.vercel.app',
    credentials: true,
  }));
  await app.listen(3000);
}
bootstrap();
