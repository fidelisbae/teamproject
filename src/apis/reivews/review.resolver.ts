import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
  constructor(
    private readonly reviewService: ReviewService,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}
}
