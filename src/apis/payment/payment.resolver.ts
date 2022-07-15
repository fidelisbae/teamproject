import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  async createPayment(
    @Args('amount') amount: number,
    @Args('quantity') quantity: number,
    @Args('price') price: number,
    @Args('impUid') impUid: string,
    @Context() context: any,
  ) {
    try {
      const accessToken = context.req.headers.authorization.split(' ')[1];
      const checkToken = jwt.verify(accessToken, 'myAccesskey');
      const nickname = checkToken['nickname'];
      return await this.paymentService.create({
        amount,
        quantity,
        price,
        impUid,
        nickname,
      });
    } catch {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }

  @Query(() => [Payment])
  async fetchPayments() {
    return await this.paymentService.findAll();
  }
  @Query(() => Payment)
  async fetchPayment(
    @Args('nickname') nickname: string, //
  ) {
    return await this.paymentService.findOne({ nickname });
  }

  @Mutation(() => Boolean)
  cancelPayment(@Args('impUid') impUid: string) {
    return this.paymentService.cancelPayment({ impUid });
  }
}
