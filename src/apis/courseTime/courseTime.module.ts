import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/entities/course.entity';
import { CourseDate } from '../courseDate/entities/courseDate.entity';
import { CourseTimeResolver } from './courseTime.resolver';
import { CourseTimeService } from './courseTime.service';
import { CourseTime } from './entities/courseTime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseTime, CourseDate, Course])],
  providers: [CourseTimeService, CourseTimeResolver],
})
export class CourseTimeModule {}
