import { Injectable, Logger } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';

@Injectable()
export class OCRExtractService {
  private readonly logger = new Logger(OCRExtractService.name);

  async extractText(imagePath: string): Promise<string> {
    try {
      this.logger.log(`Starting OCR process for image: ${imagePath}`);
      const worker = await createWorker('eng');
      const ret = await worker.recognize(imagePath);
      await worker.terminate();
      // const { data: { text } } = await Tesseract.recognize(
      //   imagePath,
      //   'eng', 
      //   {
      //     logger: m => this.logger.debug(m), 
      //   }
      // );

      this.logger.log('OCR process completed successfully.');
      return ret.data.text;
    } catch (error) {
      this.logger.error('Error during OCR process', error);
      throw new Error('Failed to extract text from the image');
    }
  }
}

