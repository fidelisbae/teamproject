import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/entities/course.entity';
import { User } from '../user/entities/user.entity';
import { Pick } from './entities/pick.entity';
import { PickResolver } from './pick.resolver';
import { PickService } from './pick.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pick, User, Course])],
  providers: [PickResolver, PickService],
})
export class PickModule {}
