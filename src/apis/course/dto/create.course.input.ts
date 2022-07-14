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

  @Field(() => [String], { nullable: true })
  materials: string[];

  @Field(() => String)
  contents: string;

  @Field(() => Date)
  openingDate: Date;

  @Field(() => Date)
  closingDate: Date;

  @Field(() => [String], { nullable: true })
  imageurls: string[];

  @Column({ type: 'decimal', precision: 9, scale: 0 })
  @Field(() => Float, { nullable: true })
  lat: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  @Field(() => Float, { nullable: true })
  lng: number;

  @Field(() => String)
  Category: string;
}
