import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './createUser.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  gender: string;

  @Field(() => Date, { nullable: true })
  birth: Date;
}
