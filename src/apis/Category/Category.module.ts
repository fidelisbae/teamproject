import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './Category.resolver';
import { CategoryService } from './Category.service';
import { Category } from './entities/Categry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
