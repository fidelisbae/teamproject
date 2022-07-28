import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  courseId: string;

  @Field(() => Int)
  rate: number;

  @Field(() => String)
  contents: string;

  @Field(() => String)
  imageURLs: string;
}
