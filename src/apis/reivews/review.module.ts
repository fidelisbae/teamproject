import { Module } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewResolver, ReviewService],
})
export class ReviewModule {}
