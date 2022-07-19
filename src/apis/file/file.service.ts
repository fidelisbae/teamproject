import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);

    const storage = new Storage({
      projectId: 'dabae-355905',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('dabaeimage');

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`dabaeimage/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    );
    return results;
  }
}
