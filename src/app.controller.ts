import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { ImageService } from './image.service';
import { OCRResultService } from './ocrresult.service';
import { OCRExtractService } from './ocr-extract.service';
import { AppService } from './app.service';
import { S3Service } from './s3.service';

import { User as UserModel, 
         Image as ImageModel,  
         OCRResult as OCRResultModel } from '@prisma/client';
import internal from 'stream';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilterRuleName, S3 } from '@aws-sdk/client-s3';
import { connect } from 'http2';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
    private readonly ocrresultService: OCRResultService,
    private readonly ocrextractService: OCRExtractService,
    private readonly appService: AppService,
    private readonly s3Service: S3Service,
  ) {}

  @Get()
  getHello(): string {
      return this.appService.getHello();
  }

  @Get('/image/:id')
  async getImageByID(@Param('id') id: string): Promise<ImageModel> {
    return this.imageService.image({id: Number(id)})
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async upload(@UploadedFile() file: Express.Multer.File, @Res() res: Response) : Promise<any> {
    console.log(file);
    console.log('A request chegou aqui baby!');
    try {
      const result = await this.s3Service.uploadFile(file);
      const filename = file.originalname;
      const path = result.fileUrl;
      const userId = 1

      //Creating the image instance at the DB
      const createdImage = await this.imageService.createImage({
        filename,
        path,
        user: {
          connect: {id : Number(userId)},
        }
      });

      console.log('created image: ', createdImage);

      const extractedText = await this.ocrextractService.extractText(path);

      console.log('extracted text: ', extractedText);

      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: result.message,
        fileUrl: result.fileUrl,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'File upload failed',
      });
    }
    // return {
    //   success: true,
    //   message: result.message,
    //   fileUrl: result.fileUrl, // Return the file URL in the response
    // };
    //return this.imageService.upload();
  }

  @Post('/image')
  async createImage(
    @Body() imageData: {filename: string; path: string; userId: string},
  ): Promise<ImageModel> {
      const {filename, path, userId } = imageData;
      return this.imageService.createImage({
        filename,
        path,
        user: {
          connect: {id : Number(userId)},
        }
      });
  }

  @Post('/user')
  async createUser(
    @Body() userData: {email: string; password: string; name: string},
  ): Promise<UserModel>{
    const {email, password, name} = userData;
    return this.userService.createUser({
      email: email,
      name: name,
      password: password,
    });
  }
  // @Post('post')
  // async createDraft(
    //   @Body() postData: { title: string; content?: string; authorEmail: string },
    // ): Promise<PostModel> {
      //   const { title, content, authorEmail } = postData;
      //   return this.postService.createPost({
        //     title,
        //     content,
        //     author: {
      //       connect: { email: authorEmail },
      //     },
    //   });
    // }
  // @Get('post/:id')
  // async getPostById(@Param('id') id: string): Promise<PostModel> {
  //   return this.postService.post({ id: Number(id) });
  // }

  // @Get('feed')
  // async getPublishedPosts(): Promise<PostModel[]> {
  //   return this.postService.posts({
  //     where: { published: true },
  //   });
  // }

  // @Get('filtered-posts/:searchString')
  // async getFilteredPosts(
  //   @Param('searchString') searchString: string,
  // ): Promise<PostModel[]> {
  //   return this.postService.posts({
  //     where: {
  //       OR: [
  //         {
  //           title: { contains: searchString },
  //         },
  //         {
  //           content: { contains: searchString },
  //         },
  //       ],
  //     },
  //   });
  // }
  
  

  // @Post('user')
  // async signupUser(
  //   @Body() userData: { name?: string; email: string },
  // ): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }

  // @Put('publish/:id')
  // async publishPost(@Param('id') id: string): Promise<PostModel> {
  //   return this.postService.updatePost({
  //     where: { id: Number(id) },
  //     data: { published: true },
  //   });
  // }

  // @Delete('post/:id')
  // async deletePost(@Param('id') id: string): Promise<PostModel> {
  //   return this.postService.deletePost({ id: Number(id) });
  // }
}
