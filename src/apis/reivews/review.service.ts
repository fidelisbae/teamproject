import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../course/entities/course.entity';
import { Image } from '../image/entities/image.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create({ score, content, courseId }) {
    const courseFound = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    const result = await this.reviewRepository.save({
      score,
      content,
      course: courseFound,
    });
    return result;
  }
  async findAll(courseId) {
    //page) {
    return await this.reviewRepository.find({
      relations: ['course'],
      where: { id: courseId },
      // skip: (page - 1) * 10,
      // take: 10,
    });
  }
  async findCount() {
    return await this.reviewRepository.count();
  }

  async delete(courseReviewId) {
    const result = await this.reviewRepository.softDelete({
      id: courseReviewId,
    });
    return result.affected ? true : false;
  }
}
