import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ImageService } from './image.service';
import { OCRResultService } from './ocrresult.service';
import { AppService } from './app.service';

import { User as UserModel, 
         Image as ImageModel,  
         OCRResult as OCRResultModel } from '@prisma/client';
import internal from 'stream';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly imageSerivce: ImageService,
    private readonly ocrresultSerivce: OCRResultService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
      return this.appService.getHello();
  }

  @Get('/image/:id')
  async getImageByID(@Param('id') id: string): Promise<ImageModel> {
    return this.imageSerivce.image({id: Number(id)})
  }
  @Post('/image')
  async createImage(
    @Body() imageData: {filename: string; path: string; userId: string},
  ): Promise<ImageModel> {
      const {filename, path, userId } = imageData;
      return this.imageSerivce.createImage({
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
