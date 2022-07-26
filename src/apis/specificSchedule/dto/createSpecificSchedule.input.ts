import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSpecificScheduleInput {
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
  courseDayId: string;
}
