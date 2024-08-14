import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OCRResult, Prisma } from '@prisma/client';

@Injectable()
export class OCRResultService {
  constructor(private prisma: PrismaService) {}

  async ocrresult(
    ocrresultWhereUniqueInput: Prisma.OCRResultWhereUniqueInput,
  ): Promise<OCRResult | null> {
    return this.prisma.oCRResult.findUnique({
      where: ocrresultWhereUniqueInput,
    });
  }

  async ocrresults(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OCRResultWhereUniqueInput;
    where?: Prisma.OCRResultWhereInput;
    orderBy?: Prisma.OCRResultOrderByWithRelationInput;
  }): Promise<OCRResult[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.oCRResult.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createOCRResult(data: Prisma.OCRResultCreateInput): Promise<OCRResult> {
    return this.prisma.oCRResult.create({
      data,
    });
  }

  async updateOCRResult(params: {
    where: Prisma.OCRResultWhereUniqueInput;
    data: Prisma.OCRResultUpdateInput;
  }): Promise<OCRResult> {
    const { where, data } = params;
    return this.prisma.oCRResult.update({
      data,
      where,
    });
  }

  async deleteOCRResult(where: Prisma.OCRResultWhereUniqueInput): Promise<OCRResult> {
    return this.prisma.oCRResult.delete({
      where,
    });
  }
}