import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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

  async create(createUserInput) {
    const result = await this.userRepository.save(createUserInput);
    return result;
  }
}
