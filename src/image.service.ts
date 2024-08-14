import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Image, Prisma } from '@prisma/client';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async image(
    imageWhereUniqueInput: Prisma.ImageWhereUniqueInput,
  ): Promise<Image | null> {
    return this.prisma.image.findUnique({
      where: imageWhereUniqueInput,
    });
  }

  async images(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ImageWhereUniqueInput;
    where?: Prisma.ImageWhereInput;
    orderBy?: Prisma.ImageOrderByWithRelationInput;
  }): Promise<Image[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.image.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createImage(data: Prisma.ImageCreateInput): Promise<Image> {
    return this.prisma.image.create({
      data,
    });
  }

  async updateImage(params: {
    where: Prisma.ImageWhereUniqueInput;
    data: Prisma.ImageUpdateInput;
  }): Promise<Image> {
    const { where, data } = params;
    return this.prisma.image.update({
      data,
      where,
    });
  }

  async deleteImage(where: Prisma.ImageWhereUniqueInput): Promise<Image> {
    return this.prisma.image.delete({
      where,
    });
  }
}