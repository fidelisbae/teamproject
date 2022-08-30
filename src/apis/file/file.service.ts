import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import 'dotenv/config';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);

    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      // keyFilename: 'omega-research-357204-a9c0c0e69b89.json',
      //배포용?
      keyFilename: '/my-secret/gcp-file-storage.json',
    }).bucket(process.env.BUCKET);

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`${process.env.BUCKET}/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    );

    return results;
  }
}
