import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { User } from '../user/entities/user.entity';

interface IOAuthUser {
  user: Pick<
    User,
    | 'email'
    | 'password'
    | 'nickname'
    | 'phone'
    | 'gender'
    | 'bank'
    | 'account'
    | 'birth'
  >;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.createSocialUser({ req, res });
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.createSocialUser({ req, res });
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakaotalk'))
  async loginKakao(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.createSocialUser({ req, res });
  }
}
