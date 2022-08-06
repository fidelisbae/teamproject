import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import 'dotenv/config';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakaotalk') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: 'https://dabae.shop/login/kakao',
      //callbackURL: 'http://localhost:3000/login/kakao',
    });
  }
  validate(accestoken, refreshToken, profile) {
    console.log(profile, '==========================');
    return {
      email: profile._json.kakao_account.email,
      nickname: profile._json.kakao_account.email.split('@')[0],
      DOB: profile._json.kakao_account.birthday,
      isHost: false,
    };
  }
}
