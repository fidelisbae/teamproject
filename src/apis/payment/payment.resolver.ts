import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { CreatePaymentInput } from './dto/createPayment.input';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql.user.param';
@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService, //
  ) {}
  @Query(() => [Payment])
  async fetchPayments() {
    return await this.paymentService.findAll();
  }

  @Query(() => Payment)
  async fetchPayment(
    @Args('email') email: string, //
  ) {
    return await this.paymentService.findOne({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.paymentService.create(currentUser, createPaymentInput);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async cancelPayment(
    @Args('impUid') impUid: string, //
  ) {
    return await this.paymentService.cancelPayment({ impUid });
  }
}
