import { ConfigService } from '@nestjs/config';

import { Bucket, Storage } from '@google-cloud/storage';
import { BadRequestException, Injectable } from '@nestjs/common';
import { parse } from 'path';

@Injectable()
export class CloudStorageService {
  private bucket: Bucket;
  private storage: Storage;

  constructor(private readonly configService: ConfigService) {
    this.storage = new Storage({
      projectId: this.configService.get('GCP_PROJECT_ID'),
      credentials: {
        client_email: this.configService.get('GCP_CLIENT_EMAIL'),
        private_key: this.configService.get('GCP_PRIVATE_KEY'),
      },
    });

    this.bucket = this.storage.bucket(
      configService.get('GCP_STORAGE_MEDIA_BUCKET'),
    );
  }

  async uploadFromBucket(uploadedFile: string, destination: string) {
    const file = this.bucket.file(destination);
    try {
      await file.save(uploadedFile);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
    return {
      publicUrl: `https://storage.googleapis.com/${this.bucket.name}/${file.name}`,
    };
  }
}
