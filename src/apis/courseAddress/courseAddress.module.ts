import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseAddressResolver } from './courseAddress.resolver';
import { CourseAddressService } from './courseAddress.service';
import { CourseAddress } from './entities/createCourseAddress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseAddress])],
  providers: [CourseAddressResolver, CourseAddressService],
})
export class CoursePlaceModule {}
