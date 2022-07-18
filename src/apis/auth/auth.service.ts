import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
    return accessToken;
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      {
        secret: 'myRefreshKey',
        expiresIn: '6h',
      },
    );
    // 개발환경
    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`); // path 설정 반드시 필요!! (소셜로그인에서)
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    // res.setHeader(
    //   'Access-Control-Allow-Headers',
    //   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    // );
    //배포할 때
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.dabae.co.kr; SameSite=None; Secure; httpOnly;`,
    // );
    //ngrok 켤 때
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.jp.ngrok.io; SameSite=None; Secure; httpOnly;`,
    );
    //local 할때
    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }
  async doWork({ req, res }) {
    let user = await this.userService.findOne({ email: req.user.email });

    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        pwd: req.user.pwd,
        nickname: req.user.nickname,
        phone: req.user.phone,
      });
    }
    this.setRefreshToken({ user, res });

    console.log(user);
    res.redirect('http://localhost:3000');
  }
}
