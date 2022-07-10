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

  async findEmail({ email }) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  async create(createUserInput) {
    const check = await this.checkEmail(createUserInput.email);
    if (check) {
      createUserInput.password = await bcryptjs.hash(
        createUserInput.password,
        10,
      );
      const result = await this.userRepository.save(createUserInput);
      return result;
    } else {
      throw new ConflictException('중복된 이메일입니다.');
    }
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
      return true;
    } else {
      return false;
    }
  }

  async delete({ id }) {
    const result = await this.userRepository.softDelete({
      id: id,
    });
    console.log(result.affected);
    return result.affected ? true : false;
  }
}
