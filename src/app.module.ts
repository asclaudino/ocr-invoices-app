import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { ImageService } from './image.service';
import { OCRResultService } from './ocrresult.service';
import { PrismaService } from './prisma.service';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { OCRExtractService } from './ocr-extract.service';
import { CorsMiddleware } from './cors.middleware';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService, 
              UserService, 
              ImageService, 
              OCRExtractService,
              OCRResultService,PrismaService, S3Service],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(CorsMiddleware)
    .forRoutes('*');
}}
