import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class subCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}
  //   async create({ mainCategoryId }) {
  //     const result = await this.subCategoryRepository.save({ mainCategoryId });
  //     return result;
  //   }
}
