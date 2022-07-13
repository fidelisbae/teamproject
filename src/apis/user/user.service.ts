import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id) {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findEmail(email) {
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

  async sendToken(phone) {
    const token = String(Math.floor(Math.random() * 10 ** 6)).padStart(6, '0');
  }

  async delete(id) {
    const result = await this.userRepository.softDelete({
      id: id,
    });
    console.log(result.affected);
    return result.affected ? true : false;
  }
}
