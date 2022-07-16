import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { User } from '../user/entities/user.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';
import axios from 'axios';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>, //

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly iamportService: IamportService,
  ) {}

  async create({ createPaymentInput }) {
    const result = await this.paymentRepository.save({
      ...createPaymentInput,
      course: createPaymentInput.courseId,
      user: createPaymentInput.userId,
      status: PAYMENT_STATUS_ENUM.PAYMENT,
    });

    return result;
  }

  async findAll() {
    const result = await this.paymentRepository.find({
      relations: ['user', 'course'],
    });
    return result;
  }

  async findOne({ email }) {
    return await this.paymentRepository.findOne({
      where: { id: email },
      relations: ['user'],
    });
  }

  // async cancelPayment({ impUid }) {
  //   const getToken = await this.iamportService.getToken();
  //   console.log(getToken);
  //   const getCancelData = await axios({
  //     url: 'https://api.iamport.kr/payments/cancel',
  //     method: 'post',
  //     headers: {
  //       Authorization: getToken,
  //     },
  //     data: {
  //       imp_uid: impUid,
  //     },
  //   });

  //   return true;
  // }
}
