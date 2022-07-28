import { Module } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';
import { Course } from '../course/entities/course.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Course, User])],
  providers: [ReviewResolver, ReviewService],
})
export class ReviewModule {}
