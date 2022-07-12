import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, CACHE_MANAGER, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { SchemaTextFieldPhonetics } from 'redis';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    const rawHeadersInAccessToken = req.rawHeaders
      .filter((ele) => {
        return ele.match(/Bearer/);
      })[0]
      .split(' ')[1];

    const check = await this.cacheManager.get(rawHeadersInAccessToken);

    if (check) throw new UnauthorizedException();

    return {
      email: payload.email,
      id: payload.sub,
      password: payload.password,
      nickname: payload.nickname,
      phone: payload.phone,
    };
  }
}
