import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  maxPrice: number;

  @Field(() => Int)
  minPrice: number;

  @Field(() => String)
  region: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  addressDetail: string;

  @Field(() => String)
  zipCode: string;

  @Field(() => String)
  difficulty: string;

  @Field(() => String)
  materials: string;

  @Field(() => String)
  contents: string;

  @Field(() => Boolean)
  status: boolean;
}
