import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SubCategory } from './entities/subCategry.entity';
import { subCategoryService } from './subCategory.service';

@Resolver()
export class SubCategoryResolver {
  constructor(private readonly subCategoryService: subCategoryService) {}

  //   @Mutation(() => SubCategory)
  //   createSubCategory(@Args('mainCategoryId') mainCategoryId: string) {
  //     return this.subCategoryService.create({ mainCategoryId });
  //  }
}
