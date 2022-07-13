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
import * as bcryptjs from 'bcryptjs';
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
    const user = await this.userService.findOne({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    const isAuth = await bcryptjs.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');
    }
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
    const user = currentUser;
    // context.res.setHeader
    await this.authService.setRefreshToken({ user, res: context.res });
    const accessToken = await this.authService.getAccessToken({ user });
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

    console.log('refresh===', refresh);
    console.log('access===', access);

    try {
      jwt.verify(access, 'myAccessKey');
      jwt.verify(refresh, 'myRefreshKey');
    } catch {
      throw new UnauthorizedException();
    }

    await this.cacheManager.set(access, 'accessToken', { ttl: 3600 });
    await this.cacheManager.set(refresh, 'refreshToken', { ttl: 3600 * 14 });

    return '로그아웃에 성공했습니다';
  }
}
