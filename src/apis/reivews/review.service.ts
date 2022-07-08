import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../course/entities/course.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>, // @InjectRepository(Course) // private readonly courseRepository: Repository<Course>, //   private readonly UserRepository: Repository<User>, //   @InjectRepository(Review) //   private readonly ReviewRepository: Repository<Review>, //   @InjectRepository(User)
  ) {}

  async create({ reviewId, score, content, created_At, url }) {
    const result = await this.reviewRepository.save({
      reviewId,
      score,
      content,
      created_At,
      url,
    });
    return result;
  }
}
