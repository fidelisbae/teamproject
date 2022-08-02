import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { User } from '../user/entities/user.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';
import axios from 'axios';
import { Course } from '../course/entities/course.entity';
import { Point } from '../point/entities/point.entity';
import { CourseTime } from '../courseTime/entities/courseTime.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>, //

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(CourseTime)
    private readonly courseTimeRepository: Repository<CourseTime>,

    private readonly iamportService: IamportService,
  ) {}

  async create(currentUser, createPaymentInput) {
    const { impUid, ...paymentInfo } = createPaymentInput;
    // 실제 결제내역인지 확인
    await this.iamportService.getData({ impUid });

    // input에서 입력받은 email로 실제 유저 엔티티 불러오기
    const userFound = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    // input에서 입력받은 id로 실제 course 엔티티 불러오기
    const courseFound = await this.courseRepository.findOne({
      where: { id: createPaymentInput.courseId },
    });

    const courseTimeFound = await this.courseTimeRepository.findOne({
      where: { id: createPaymentInput.courseTimeId },
    });

    // Payment 만들기

    const result = await this.paymentRepository.save({
      ...createPaymentInput,
      course: courseFound,
      user: userFound,
      status: PAYMENT_STATUS_ENUM.PAYMENT,
      courseTime: courseTimeFound,
    });

    // 👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻
    // 수정해야할것: 항상 최대할인율을 적용하는 방식이 아니라 스케쥴에서 최대인원과 현재인원을 받아서 인원비율로 할인율을 적용해야함

    // 최대가격 - 최소가격 / 최대가격 × 100% = 최대할인율
    const max = courseFound.maxPrice;
    const min = courseFound.minPrice;
    const discountRate = (max - min) / max;
    const pointAdded = createPaymentInput.price * discountRate;

    // 유저 포인트 업데이트
    await this.userRepository.save({
      ...userFound,
      point: userFound.point + pointAdded,
    });

    return result;
  }

  async findAll() {
    const result = await this.paymentRepository.find({
      relations: ['user', 'course', 'courseTime'],
    });
    return result;
  }

  async findOne({ paymentId }) {
    return await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
  }

  async cancelPayment({ impUid }) {
    const access_token = await this.iamportService.getToken();
    console.log(access_token);
    try {
      const getCancelData = await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
          Authorization: access_token,
          'Content-Type': 'application/json',
        },
        data: {
          imp_uid: impUid,
        },
      });
      console.log(getCancelData);

      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
