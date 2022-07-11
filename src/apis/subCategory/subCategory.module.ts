import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategry.entity';
import { SubCategoryResolver } from './subCategory.resolver';
import { subCategoryService } from './subCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory])],
  providers: [SubCategoryResolver, subCategoryService],
})
export class SubCategoryModule {}
