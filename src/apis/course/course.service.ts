import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../image/image.entity';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create({ createCourseInput }) {
    const { subCategoryId, courseAddressId, url, ...course } =
      createCourseInput;

    const result = await this.courseRepository.save({
      ...course,
      subCategory: { id: subCategoryId },
      courseAddress: { id: courseAddressId },
    });
    await Promise.all(
      url.map((address) => {
        return this.imageRepository.save({
          url: address,
          course: { id: result.id },
        });
      }),
    );
    return result;
  }
  async findOne({ courseId }) {
    return await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['subcategory', 'review', 'user', 'payment'],
    });
  }
  async findAll() {
    return await this.courseRepository.find();
  }

  async update({ courseId, updateCourseInput }) {
    const { url, ...updateCourse } = updateCourseInput;
    const myCourse = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    const prevImage = await this.imageRepository.find({
      where: { course: { id: courseId } },
    });

    const prevUrl = prevImage.map((url) => url.url);

    await Promise.all(
      url.map((image) => {
        if (!prevUrl.includes(image)) {
          return this.imageRepository.save({
            url: image,
            course: { id: courseId },
          });
        }
      }),
    );
    const newCourse = {
      ...myCourse,
      id: courseId,
      ...updateCourse,
    };
    return await this.courseRepository.save(newCourse);
  }

  async delete({ courseId }) {
    const result = await this.courseRepository.softDelete({ id: courseId });
    return result.affected ? true : false;
  }
}
