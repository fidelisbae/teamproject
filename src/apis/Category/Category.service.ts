import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/Categry.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
  ) {}

  async create({ name }) {
    const result2 = await this.CategoryRepository.save({
      name,
    });
    return result2;
  }
}
