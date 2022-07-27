import {
  Inject,
  UnauthorizedException,
  CACHE_MANAGER,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { GqlAuthRefreshGuard } from 'src/common/auth/gql.auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql.user.param';
import * as jwt from 'jsonwebtoken';
import { IContext } from 'src/common/types/context';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() Context: IContext,
  ) {
    const user = await this.userService.findEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    await this.userService.checkPassword(password, user.password);
    await this.authService.setRefreshToken({
      user,
      res: Context.req.res,
    });
    const accessToken = await this.authService.getAccessToken({ user });
    return accessToken;
  }

  @Mutation(() => String)
  async hostLogin(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() Context: IContext,
  ) {
    const user = await this.userService.findEmail({ email });
    if (!user.isHost) {
      throw new UnauthorizedException('호스트 계정이 아닙니다.');
    }
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    await this.userService.checkPassword(password, user.password);
    await this.authService.setRefreshToken({
      user,
      res: Context.req.res,
    });
    const accessToken = await this.authService.getAccessToken({ user });
    return accessToken;
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async restoreAccessToken(
    @Context() context: IContext,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    const user = await this.userService.findOne(currentUser.id);
    await this.authService.setRefreshToken({ user: user, res: context.res });
    const accessToken = await this.authService.getAccessToken({ user: user });
    return accessToken;
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async logout(@Context() Context: IContext) {
    const refresh = Context.req.rawHeaders
      .filter((ele) => {
        return ele.match(/refresh/);
      })[0]
      .split('=')[1];

    const access = Context.req.rawHeaders
      .filter((ele) => {
        return ele.match(/Bearer/);
      })[0]
      .split(' ')[1];

    try {
      jwt.verify(access, 'myAccessKey');
      jwt.verify(refresh, 'myRefreshKey');

      await this.cacheManager.set(access, 'accessToken', { ttl: 3600 });
      await this.cacheManager.set(refresh, 'refreshToken', { ttl: 3600 * 14 });
    } catch {
      throw new UnauthorizedException();
    }

    return '로그아웃에 성공했습니다';
  }
}
