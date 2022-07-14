import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryService } from './Category.service';
import { Category } from './entities/Categry.entity';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('name')
    name: string,
  ) {
    return await this.categoryService.create({ name });
  }
}
