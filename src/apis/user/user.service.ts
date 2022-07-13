import {
  ConflictException,
  Injectable,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { Cache } from 'cache-manager';
import coolsms from 'coolsms-node-sdk';
import 'dotenv/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id) {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findEmail({ email }) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  async create(createUserInput) {
    const passwordAuth =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(
        createUserInput.password,
      );
    if (!passwordAuth) {
      throw new ConflictException(
        '비밀번호는 영문, 숫자, 특수문자를 최소 1자씩 포함하여 8~16자리로 입력해주세요.',
      );
    }
    createUserInput.password = await bcryptjs.hash(
      createUserInput.password,
      10,
    );
    const result = await this.userRepository.save(createUserInput);
    return result;
  }

  async update({ email, updateUserInput }) {
    const myUser = await this.userRepository.findOne({
      where: { email: email },
    });

    const newUser = {
      ...myUser,
      email: email,
      ...updateUserInput,
    };
    return await this.userRepository.save(newUser);
  }

  async updatePassword({ id, hashedpassword: password }) {
    const myUser = await this.userRepository.findOne({
      where: { id: id },
    });

    const newUser = {
      ...myUser,
      password,
    };
    return await this.userRepository.save(newUser);
  }

  async checkEmail(email) {
    const hasEmail = await this.userRepository.findOne({
      where: { email: email },
    });

    if (hasEmail === null) {
      return false;
    } else {
      return true;
    }
  }

  async sendToken(phone: string) {
    const token = String(Math.floor(Math.random() * 10 ** 6)).padStart(6, '0');
    console.log(token);
    await this.cacheManager.set(phone, token, { ttl: 180 });
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;
    const SMS_SENDER = process.env.SMS_SENDER;

    // 문자 요금 청구될까봐 주석처리해둠

    // const messageService = new coolsms(SMS_KEY, SMS_SECRET);
    // const result = await messageService.sendOne({
    //   to: phone,
    //   from: process.env.SMS_SENDER,
    //   text: `[다배] 요청하신 인증번호는 [${token}] 입니다.`,
    //   autoTypeDetect: true,
    // });
    return '핸드폰으로 인증번호를 전송했습니다.';
  }

  async authPhoneOk(phone: string, inputToken: string) {
    const token = await this.cacheManager.get(phone);
    if (token === inputToken) {
      return '인증이 완료되었습니다.';
    } else {
      return '인증에 실패하였습니다.';
    }
  }

  async delete(id) {
    const result = await this.userRepository.softDelete({
      id: id,
    });
    console.log(result.affected);
    return result.affected ? true : false;
  }
}
