import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePickInput {
  @Field(() => String)
  user: string;

  @Field(() => String)
  course: string;
}
