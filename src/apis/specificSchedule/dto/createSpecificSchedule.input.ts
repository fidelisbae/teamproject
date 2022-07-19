import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSpecificScheduleInput {
  @Field(() => Date)
  courseStartTime: Date;

  @Field(() => Date)
  courseEndTime: Date;

  @Field(() => Int)
  maxUsers: number;

  @Field(() => Int)
  reservedPerson: number;

  @Field(() => Date)
  RecruitmentStartDate: Date;

  @Field(() => Date)
  RecruitmentEdnDate: Date;
}
