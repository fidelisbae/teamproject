import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/entities/course.entity';

import { IamportService } from '../iamport/iamport.service';
import { Point } from '../point/entities/point.entity';
import { SpecificSchedule } from '../specificSchedule/entities/specificSchedule.entity';
import { User } from '../user/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, User, Course, Point, SpecificSchedule]),
  ],
  providers: [PaymentResolver, PaymentService, IamportService],
})
export class PaymentModule {}
