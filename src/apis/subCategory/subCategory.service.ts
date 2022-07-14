import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async create({ createSubCategoryInput }) {
    const { mainCategoryId, ...subCategory } = createSubCategoryInput;

    const result2 = await this.subCategoryRepository.save({
      ...subCategory,
      mainCategory: { id: mainCategoryId },
    });
    return result2;
  }
}
