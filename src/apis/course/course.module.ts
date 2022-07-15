import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { Pick } from '../pick/entities/pick.entity';
import { User } from '../user/entities/user.entity';
import { Image } from '../image/entities/image.entity';
import { Category } from '../category/entities/categry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User, Image, Pick, Category])],
  exports: [CourseService],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
