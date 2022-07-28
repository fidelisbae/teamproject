import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCourseTimeInput {
  @Field(() => Date)
  courseStartTime: Date;

  @Field(() => Date)
  courseEndTime: Date;

  @Field(() => Int)
  maxUsers: number;

  @Field(() => Date)
  recruitmentStartDate: Date;

  @Field(() => Date)
  recruitmentEndDate: Date;

  @Field(() => String)
  courseDateId: string;

  @Field(() => String)
  courseId: string;
}
