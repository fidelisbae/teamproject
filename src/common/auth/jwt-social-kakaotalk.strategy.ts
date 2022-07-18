import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import 'dotenv/config';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakaotalk') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: 'http://localhost:3000/login/kakao',
    });
  }
  validate(accestoken, refreshToken, profile) {
    console.log(accestoken);
    console.log(refreshToken);
    console.log(profile);
    return {
      email: profile._json.kakao_account.email,
      pwd: '0000',
      name: profile.username,
      phone: '01034781',
      DOB: profile._json.kakao_account.birthday,
      address: '',
    };
  }
}
