import { Resolver } from '@nestjs/graphql';
import { MainCategoryService } from './maincategory.service';

@Resolver()
export class MainCategoryResolver {
  constructor(private readonly mainCategoryService: MainCategoryService) {}
}
