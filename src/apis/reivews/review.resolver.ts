import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  async createReview(
    @Args('score') score: number,
    @Args('content') content: string,
    @Args('courseId') courseId: string,
  ) {
    return this.reviewService.create({
      score,
      content,
      courseId,
    });
  }
}
