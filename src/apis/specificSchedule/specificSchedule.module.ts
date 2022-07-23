import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDate } from '../courseDate/entities/courseDate.entity';
import { SpecificSchedule } from './entities/specificSchedule.entity';
import { SpecificScheduleResolver } from './specificSchedule.resolver';
import { SpecificScheduleService } from './specificSchedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecificSchedule, CourseDate])],
  providers: [SpecificScheduleService, SpecificScheduleResolver],
})
export class SpecificScheduleModule {}
