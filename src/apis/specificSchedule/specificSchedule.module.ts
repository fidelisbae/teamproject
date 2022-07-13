import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecificSchedule } from './entities/specificSchedule.entity';
import { SpecificScheduleResolver } from './specificSchedule.resolver';
import { SpecificScheduleService } from './specificSchedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecificSchedule])],
  providers: [SpecificScheduleService, SpecificScheduleResolver],
})
export class SpecificScheduleModule {}
