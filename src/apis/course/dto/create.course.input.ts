import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  maxUsers: number;

  @Field(() => Int)
  maxPrice: number;

  @Field(() => Int)
  minPrice: number;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  maxDiscount: number;

  @Field(() => String)
  difficulty: string;

  @Field(() => String)
  materials: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  addressDetail: string;

  @Field(() => String)
  zipCode: string;

  @Field(() => String)
  contents: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => Date)
  courseStartTime: Date;

  @Field(() => Date)
  courseEndTime: Date;

  @Field(() => String)
  region: string;
}
// 시작일 종료일
// 최대 인원, 현재인원
// 가격
// 최대할인율
// 이미지 (파일을 받아서 저장 / 사이즈 통일)
//난이도 & 준비물
//장소 (우편번호, 큰 주소, 작은 주소)
//contents
