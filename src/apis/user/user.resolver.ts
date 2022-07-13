import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcryptjs from 'bcryptjs';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql.user.param';
import { UpdateUserInput } from './dto/updateUser.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async fetchUsers() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async fetchUser(@Args('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Query(() => Boolean)
  async hasEmail(@Args('email') email: string) {
    return await this.userService.checkEmail(email);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => String)
  async sendTokenToPhone(@Args('phone') phone: string) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('email') email: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.update({ email, updateUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updatePassword(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('newPassword') newPassword: string,
  ) {
    const hashedpassword = await bcryptjs.hash(newPassword, 10);
    const id = currentUser.id;
    return await this.userService.updatePassword({
      id,
      hashedpassword,
    });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string) {
    return await this.userService.delete({ id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteLoginUser(@CurrentUser() currentUser: ICurrentUser) {
    return this.userService.delete({ id: currentUser.id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchLoginUser(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return await this.userService.findEmail({ email: currentUser.email });
  }
}
