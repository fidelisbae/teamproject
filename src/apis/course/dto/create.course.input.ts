import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  maxPrice: number;

  @Field(() => Int)
  minPrice: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  addressDetail: string;

  @Field(() => String)
  zipCode: string;

  @Field(() => String)
  difficulty: string;

  @Field(() => [String], { nullable: true })
  materials: string[];

  @Field(() => String)
  contents: string;

  @Field(() => Date)
  openingDate: Date;

  @Field(() => Date)
  closingDate: Date;

  @Field(() => [String], { nullable: true })
  imageURLs: string[];

  @Field(() => String)
  category: string;
}
