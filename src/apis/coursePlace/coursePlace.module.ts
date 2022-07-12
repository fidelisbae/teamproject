import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursePlaceResolver } from './coursePlace.resolver';
import { CoursePlaceService } from './coursePlace.service';
import { CoursePlace } from './entities/createCoursePlace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursePlace])],
  providers: [CoursePlaceResolver, CoursePlaceService],
})
export class CoursePlaceModule {}
