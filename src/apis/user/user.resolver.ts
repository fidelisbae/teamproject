import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcryptjs from 'bcryptjs';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { ConflictException, UseGuards } from '@nestjs/common';
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

  @Mutation(() => Boolean)
  async checkEmail(@Args('email') email: string) {
    return await this.userService.checkEmail(email);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const check1 = await this.userService.checkEmail(createUserInput.email);
    if (!check1) {
      throw new ConflictException('이메일이 올바르지 않습니다.');
    }
    const check2 = await this.userService.checkPhone(createUserInput.phone);
    if (!check2) {
      throw new ConflictException('핸드폰번호가 올바르지 않습니다.');
    }
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => String)
  async sendTokenToPhone(@Args('phone') phone: string) {
    const check = await this.userService.checkPhone(phone);
    if (!check) {
      throw new ConflictException('핸드폰번호가 올바르지 않습니다.');
    }
    return await this.userService.sendToken(phone);
  }

  @Mutation(() => Boolean)
  async authPhoneOk(
    @Args('phone') phone: string,
    @Args('inputToken') inputToken: string,
  ) {
    return await this.userService.authPhoneOk(phone, inputToken);
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
    const email = currentUser.email;
    return await this.userService.updatePassword({
      email,
      hashedpassword,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean, {
    description: '회원탈퇴 api,로그인된 유저가 비밀번호 체크 후에 유저삭제',
  })
  async deleteLoginUser(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('inputPassword') inputPassword: string,
  ) {
    const user = await this.userService.findOne(currentUser.id);
    const id = currentUser.id;
    const password = user.password;
    return this.userService.delete(id, password, inputPassword);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchLoginUser(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return await this.userService.findEmail({ email: currentUser.email });
  }

  @Mutation(() => User)
  async forgotPassword(
    @Args('email') email: string,
    @Args('newPassword') newPassword: string,
  ) {
    const hashedpassword = await bcryptjs.hash(newPassword, 10);
    return await this.userService.updatePassword({ email, hashedpassword });
  }
}
