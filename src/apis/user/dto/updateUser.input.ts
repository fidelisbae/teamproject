import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import { CreateUserInput } from './createUser.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  gender: string;

  @Field(() => Date, { nullable: true })
  birth: Date;
}
