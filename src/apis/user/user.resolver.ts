import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql.user.param';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcryptjs from 'bcryptjs';
import { CreateHostInput } from './dto/createHost.input';

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

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async createHost(@Args('createHostInput') createHostInput: CreateHostInput) {
    return await this.userService.createHost(createHostInput);
  }

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
