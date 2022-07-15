import {
  Inject,
  Injectable,
  CACHE_MANAGER,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },

      secretOrKey: 'myRefreshKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const rawHeadersInRefreshToken = req.rawHeaders
      .filter((ele) => {
        return ele.match(/refresh/);
      })[0]
      .split('=')[1];

    const check = await this.cacheManager.get(rawHeadersInRefreshToken);

    if (check) throw new UnauthorizedException();

    return {
      id: payload.sub,
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
      phone: payload.phone,
    };
  }
}
