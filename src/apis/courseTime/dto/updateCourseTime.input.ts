import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCourseTimeInput } from './createCourseTime.input';

@InputType()
export class UpdateCourseTimeInput extends PartialType(CreateCourseTimeInput) {}
