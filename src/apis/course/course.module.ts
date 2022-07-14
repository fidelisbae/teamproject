import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { Image } from '../image/image.entity';

import { Pick } from '../pick/entities/pick.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Image, Pick])],

  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
