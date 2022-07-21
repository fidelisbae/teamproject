import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../course/entities/course.entity';
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
}
