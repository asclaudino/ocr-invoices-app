import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import dotenv from 'dotenv';
import { Post } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'http://localhost:3000', 
    //origin: 'https://file-uploader-tawny.vercel.app',
    //methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //preflightContinue: false,
    //optionsSuccessStatus: 204,
     credentials: true,
  }));
  await app.listen(8000);
}
bootstrap();
