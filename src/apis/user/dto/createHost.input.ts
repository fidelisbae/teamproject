import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateHostInput {
  @Field(() => Boolean)
  isHost: boolean;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  nickname: string;

  @Field(() => String)
  phone: string;

  @Field(() => Boolean)
  marketingAgreement: boolean;

  @Field(() => String)
  account: string;

  @Field(() => String)
  bank: string;

  @Field(() => String)
  businessName: string;

  @Field(() => String)
  businessNumber: string;
}
