import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  courseId: string;

  @Field(() => Float)
  rate: number;

  @Field(() => String)
  contents: string;

  @Field(() => String)
  imageURLs: string;
}
