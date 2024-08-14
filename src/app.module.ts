import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { ImageService } from './image.service';
import { OCRResultService } from './ocrresult.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, ImageService, OCRResultService,PrismaService],
})
export class AppModule {}
