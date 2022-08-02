import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCourseInput } from './create.course.input';

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
  // @Field(() => String)
  // name: string;
  // @Field(() => Int, { nullable: true })
  // maxPrice: number;
  // @Field(() => Int, { nullable: true })
  // minPrice: number;
  // @Field(() => String, { nullable: true })
  // address: string;
  // @Field(() => String, { nullable: true })
  // addressDetail: string;
  // @Field(() => String, { nullable: true })
  // zipCode: string;
  // @Field(() => String, { nullable: true })
  // difficulty: string;
  // @Field(() => [String], { defaultValue: ['준비물없음'] })
  // materials: string[];
  // @Field(() => String, { nullable: true })
  // contents: string;
  // @Field(() => Date, { nullable: true })
  // openingDate: Date;
  // @Field(() => Date, { nullable: true })
  // closingDate: Date;
  // @Field(() => [String], { nullable: true })
  // imageURLs: string[];
  // @Field(() => Float, { nullable: true })
  // lat: number;
  // @Field(() => Float, { nullable: true })
  // lng: number;
}
