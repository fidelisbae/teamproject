import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './createUser.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Boolean, { nullable: true })
  gender: boolean;

  @Field(() => Date, { nullable: true })
  birth: Date;
}
