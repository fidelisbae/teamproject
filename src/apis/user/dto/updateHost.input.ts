import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateHostInput } from './createHost.input';

@InputType()
export class UpdateHostInput extends PartialType(CreateHostInput) {
  @Field(() => String, { nullable: true })
  gender: string;

  @Field(() => Date, { nullable: true })
  birth: Date;
}
