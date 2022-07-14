import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Column } from 'typeorm';

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

  @Field(() => String)
  materials: string;

  @Field(() => String)
  contents: string;

  @Field(() => Date)
  openingDate: Date;

  @Field(() => Date)
  closingDate: Date;

  @Field(() => [String])
  url: string[];

  @Column({ type: 'decimal', precision: 9, scale: 0 })
  @Field(() => Float)
  lat: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  @Field(() => Float)
  lng: number;

  @Field(() => String)
  subCategory: string;

  // @Field(() => [String], { nullable: true })
  // url?: string[];
}
