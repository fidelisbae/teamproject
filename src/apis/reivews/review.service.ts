import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  // constructor(
  //   @InjectRepository(Review)
  //   private readonly ReviewRepository: Repository<Review>,
  //   @InjectRepository(Course)
  //   private readonly CourseRepository: Repository<Course>,
  //   @InjectRepository(User)
  //   private readonly UserRepository: Repository<User>,
  // ) {}
}
