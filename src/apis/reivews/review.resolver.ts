import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'http';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  async createReview(
    @Args('score') score: number,
    @Args('content') content: string,
    @Args('created_At') created_At: Date,
    @Args('url') url: string,
  ) {
    return this.reviewService.create({
      score,
      content,
      created_At,
      url,
    });
  }
}
