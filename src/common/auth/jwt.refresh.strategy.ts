import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        console.log(cookie);
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },

      secretOrKey: 'myRefreshKey',
      passReqToCallback: true,
    });
  }

  validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
      phone: payload.phone,
    };
  }
}
