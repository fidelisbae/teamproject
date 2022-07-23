import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);

    const storage = new Storage({
      projectId: 'omega-research-357204',
      keyFilename: './gcp-file-storage.json',
      //배포용?
      //keyFilename: '/my-secret/gcp-file-storage.json',
    }).bucket('dabaeimage0');
    console.log(Storage);

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
