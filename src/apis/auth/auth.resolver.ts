import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcryptjs from 'bcryptjs';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.userService.findEmail({ email });
    const isAuthenticated = await bcryptjs.compare(password, user.password);
    if (!isAuthenticated) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    const accessToken = this.authService.getAccessToken({ user });
    return accessToken;
  }
}
