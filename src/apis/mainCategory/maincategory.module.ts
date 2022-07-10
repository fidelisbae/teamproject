import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from './entities/maincategory.entity';
import { MainCategoryResolver } from './maincategory.resolver';
import { MainCategoryService } from './maincategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([MainCategory])],
  providers: [MainCategoryResolver, MainCategoryService],
})
export class MainCategoryModule {}
