import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FileService {
  async upload({ files }) {
    //구글스토리지에 파일 업로드하기
    const waitedFiles = await Promise.all(files); //file의 배열임
    // console.log(waitedFiles); //waitedfile도 배열임
    //const myfile = files[0];

    //구글 스토리지 사용하려면 먼저 구글 클라우드 스토리지 설치해야함
    const storage = new Storage({
      projectId: 'dabae-355905',
      keyFilename: './key/gcp-file-storage.json',
    }).bucket('dabaeimage');

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream() //el.filename이 파일 이름 변경하는 것
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`dabaeimage/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    );
    return results;
  }
}
