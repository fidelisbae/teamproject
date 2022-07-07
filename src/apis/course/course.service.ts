import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  //subCategoryId, paymentId, userId, reviewId, url,
  async create({ createCourseInput }) {
    const { ...course } = createCourseInput;

    const result = await this.courseRepository.save({
      ...course,
      // subCategoryId: { id: subCategoryId },
      // paymentId: { id: paymentId },
      // userId: { id: userId },
      // reviewId: { id: reviewId },
    });
    // await Promise.all(
    //   url.map((address) => {
    //     return this.
    //   })
    //);sa
    return result;
  }
  async findOne({ courseId }) {
    return await this.courseRepository.findOne({
      where: { id: courseId },
      // relations:["subcategory", "review", "user","payment"]
    });
  }
  async findAll() {
    return await this.courseRepository.find();
  }
}
