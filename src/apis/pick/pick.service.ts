import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePickInput } from './dto/createPick.input';
import { Pick } from './entities/pick.entity';

@Injectable()
export class PickService {
  constructor(
    @InjectRepository(Pick)
    private readonly pickRepository: Repository<Pick>,
  ) {}

  async findAll() {
    return await this.pickRepository.find();
  }

  async create(createPickInput) {
    const result = await this.pickRepository.save(createPickInput);
    return result;
  }
}
