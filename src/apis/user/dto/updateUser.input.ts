import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './createUser.input';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  nickname: string;

  @Field(() => Boolean)
  marketingAgreement: boolean;

  @Field(() => String, { nullable: true })
  account: string;

  @Field(() => String, { nullable: true })
  bank: string;

  @Field(() => String, { nullable: true })
  businessName: string;

  @Field(() => String, { nullable: true })
  businessNumber: string;

  @Field(() => Boolean, { nullable: true })
  gender: boolean;

  @Field(() => Date, { nullable: true })
  birth: Date;

  @Field(() => String, { nullable: true })
  profileImageURL: string;
}
