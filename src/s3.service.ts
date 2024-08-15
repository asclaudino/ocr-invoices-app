import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  private readonly bucketName: string;

  constructor(private configService: ConfigService) {
    this.client = new S3Client({
      forcePathStyle: true,
      region: this.configService.get<string>('SUPABASE_REGION'),
      endpoint: this.configService.get<string>('SUPABASE_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('SUPABASE_BUCKET_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('SUPABASE_BUCKET_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.get<string>('SUPABASE_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    const { originalname } = file;
    const uploadParams = {
      Bucket: this.bucketName,
      Key: originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const data = await this.client.send(new PutObjectCommand(uploadParams));

      // Construct the file URL
      const fileUrl = `${this.configService.get<string>('SUPABASE_PUBLIC_ENDPOINT')}/${this.bucketName}/${originalname}`;

      return {
        message: 'File uploaded successfully',
        fileUrl, // Include the file URL in the response
        data,
      };
    } catch (err) {
      throw new Error('Error uploading file');
    }
  }
}
