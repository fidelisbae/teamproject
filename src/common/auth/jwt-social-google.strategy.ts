import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import 'dotenv/config';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }
  validate(accestoken, refreshToken, profile) {
    console.log(accestoken);
    console.log(refreshToken);
    console.log(profile);
    return {
      email: profile.emails[0].value,
      pwd: '12093812093',
      name: profile.displayName,
      phone: '01034781231',
      address: '',
      DOB: '2002-04-12',
    };
  }
}
