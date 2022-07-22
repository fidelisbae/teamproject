import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  async createCourseReview(
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
  @Query(() => Review)
  async fethchCourseReviews(
    @Args('courseId') courseId: string,
    //  @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.reviewService.findAll(courseId); //page);
  }
  @Mutation(() => Boolean)
  deleteCourseReview(@Args('courseReviewId') courseReviewId: string) {
    return this.reviewService.delete(courseReviewId);
  }
}
