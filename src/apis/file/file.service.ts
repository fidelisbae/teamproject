import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../image/entities/image.entity';
import { CourseService } from '../course/course.service';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly courseService: CourseService,
  ) {}
  async upload(files, courseId) {
    const waitedFiles = await Promise.all(files);

    const storage = new Storage({
      projectId: 'dabae-355905',
      keyFilename: './key/gcp-file-storage.json',
    }).bucket('dabaeimage');

    const results = (
      (await Promise.all(
        waitedFiles.map((el) => {
          return new Promise((resolve, reject) => {
            el.createReadStream() //el.filename이 파일 이름 변경하는 것
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`dabaeimage/${el.filename}`))
              .on('error', () => reject(null));
          });
        }),
      )) as string[]
    ).filter((v) => v !== null);
    console.log(results);

    const course = await this.courseService.findOne({ courseId });

    for (let i = 0; i < results.length; i++) {
      await this.imageRepository.save({ url: results[i], course: course });
    }

    return results;
  }
}
