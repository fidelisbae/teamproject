import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSpecificScheduleInput {
  @Field(() => String)
  courseStartTime: string;

  @Field(() => String)
  courseEndTime: string;

  @Field(() => Int)
  maxUsers: number;

  @Field(() => Date)
  recruitmentStartDate: Date;

  @Field(() => Date)
  recruitmentEndDate: Date;
}
