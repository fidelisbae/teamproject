import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDateResolver } from './courseDate.resolver';
import { CourseDateService } from './courseDate.service';
import { CourseDate } from './entities/courseDate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseDate])],
  providers: [CourseDateResolver, CourseDateService],
})
export class CourseDateModule {}
