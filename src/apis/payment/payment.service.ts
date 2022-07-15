import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { User } from '../user/entities/user.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly iamportService: IamportService,
  ) {}

  async findAll() {
    const result = await this.paymentRepository.find({
      relations: ['user', 'course'],
    });
    return result;
  }

  async findOne({ nickname }) {
    return await this.paymentRepository.findOne({
      where: { id: nickname },
      relations: ['user'],
    });
  }

  async create({ amount, quantity, price, impUid, nickname }) {
    const findUser = await this.userRepository.findOne({
      where: { nickname },
    });

    const result = await this.paymentRepository.save({
      amount,
      quantity,
      price,
      impUid,
      nickname: findUser.id,
      status: PAYMENT_STATUS_ENUM.PAYMENT,
    });
    return result;
  }

  async cancelPayment({ impUid }) {
    const getToken = await this.iamportService.getToken();
    const getCancelData = await axios({
      url: 'https://api.iamport.kr/payments/cancel',
      method: 'post',
      headers: {
        Authorization: getToken,
      },
      data: {
        imp_uid: impUid,
      },
    });
    return true;
  }
}
