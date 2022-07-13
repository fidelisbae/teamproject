// import { UseGuards } from '@nestjs/common';
// import { Args, Mutation, Resolver } from '@nestjs/graphql';
// import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
// import { Payment } from './entities/payment.entity';
// import { PaymentService } from './payment.service';

// @Resolver()
// export class PaymentResolver {
//   constructor(private readonly paymentService: PaymentService) {}

//   @UseGuards(GqlAuthAccessGuard)
//   @Mutation(() => Payment)
//   createPayment(
//     @Args('impUid') impUid: string,
//     @Args('amount') amount: number,
//     @Args('quantity') quantity: number,
//     @Args('price') price: number,
//   ) {
//     return this.paymentService.create({ impUid, amount, quantity, price });
//   }
// }
