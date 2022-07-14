import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateSubCategoryInput } from './dto/createSubCategory.input';
import { SubCategory } from './entities/subCategry.entity';
import { SubCategoryService } from './subCategory.service';

@Resolver()
export class SubCategoryResolver {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Mutation(() => SubCategory)
  createSubCategory(
    @Args('createSubCategoryInput')
    createSubCategoryInput: CreateSubCategoryInput,
  ) {
    return this.subCategoryService.create({ createSubCategoryInput });
  }
}
