import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcryptjs from 'bcryptjs';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import {
  ConflictException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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

  @Mutation(() => Boolean, {
    description:
      '이메일 중복을 체크하는 api, 이메일이 중복이면 false, 중복이아니면 true 또한, 이메일이 올바른 양식인지도 판별함',
  })
  async checkEmail(@Args('email') email: string) {
    await this.userService.checkEmail(email);
    return true;
  }

  @Mutation(() => Boolean, {
    description:
      '핸드폰 중복을 체크하는 api, 핸드폰번호가 중복이면 false, 중복이아니면 true 또한, 핸드폰 번호가 올바른 양식인지도 판별함',
  })
  async checkPhone(@Args('phone') phone: string) {
    await this.userService.checkPhone(phone);
    return true;
  }

  @Mutation(() => Boolean, {
    description:
      '닉네임 중복을 체크하는 api, 닉네임이 중복이면 false, 중복이아니면 true',
  })
  async checkNickname(@Args('nickname') nickname: string) {
    return await this.userService.checkNickname(nickname);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    await this.userService.checkEmail(createUserInput.email);
    await this.userService.checkPhone(createUserInput.phone);
    return await this.userService.create(createUserInput);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User, { description: '유저를 호스트로 바꾸는 api' })
  async userToHost(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('businessName') businessName: string,
    @Args('businessNumber') businessNumber: string,
  ) {
    const email = currentUser.email;
    return await this.userService.userToHost(
      email,
      businessName,
      businessNumber,
    );
  }

  @Mutation(() => String)
  async sendTokenToPhone(@Args('phone') phone: string) {
    await this.userService.checkPhone(phone);
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
    @CurrentUser() currentUser: ICurrentUser,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const email = currentUser.email;
    return await this.userService.update({ email, updateUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean, {
    description:
      '유저가 마이페이지에서 비밀번호를 변경하는 api, 기존 비밀번호를 체크 후에 새 비밀번호를 양식에 따라 입력받는다.',
  })
  async updatePassword(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('newPassword') newPassword: string,
    @Args('inputPassword') inputPassword: string,
  ) {
    const passwordAuth =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(
        newPassword,
      );
    if (!passwordAuth) {
      throw new ConflictException(
        '비밀번호는 영문, 숫자, 특수문자를 최소 1자씩 포함하여 8~16자리로 입력해주세요.',
      );
    }

    const user = await this.userService.findOne(currentUser.id);
    const currentPassword = user.password;

    const hashedpassword = await bcryptjs.hash(newPassword, 10);
    const email = currentUser.email;
    await this.userService.checkPassword(inputPassword, currentPassword);
    await this.userService.updatePassword({
      email,
      hashedpassword,
    });
    return true;
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
    await this.userService.checkPassword(inputPassword, password);
    return this.userService.delete(id);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchLoginUser(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return await this.userService.findEmail({ email: currentUser.email });
  }

  // 핸드폰 번호만 입력받고 인증이 완료되면 이메일을 리턴해주기
  @Mutation(() => String, {
    description: '핸드폰을 입력받고 인증절차 진행',
  })
  async forgotPasswordSendToken(@Args('phone') phone: string) {
    return await this.userService.sendToken(phone);
  }

  @Mutation(() => String, {
    description: '유저에게 핸드폰 인증을 완료 받으면 이메일을 리턴함.',
  })
  async forgotPasswordAuthPhoneOk(
    @Args('phone') phone: string,
    @Args('inputToken') inputToken: string,
  ) {
    const user = await this.userService.findPhone(phone);
    if (await this.authPhoneOk(phone, inputToken)) {
      return user.email;
    } else {
      throw new UnauthorizedException('인증번호가 일치하지 않습니다.');
    }
  }

  @Mutation(() => String, {
    description: '휴대폰인증 완료시 비밀번호 변경 api',
  })
  async forgotPasswordUpdate(
    @Args('newPassword') newPassword: string,
    @Args('email') email: string,
  ) {
    const passwordAuth =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(
        newPassword,
      );
    if (!passwordAuth) {
      throw new ConflictException(
        '비밀번호는 영문, 숫자, 특수문자를 최소 1자씩 포함하여 8~16자리로 입력해주세요.',
      );
    }

    const hashedpassword = await bcryptjs.hash(newPassword, 10);

    await this.userService.updatePassword({ email, hashedpassword });
    return '새로운 비밀번호가 설정되었습니다.';
  }
}
