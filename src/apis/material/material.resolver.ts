import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Material } from './entities/material.entity';
import { MaterialService } from './material.service';

@Resolver()
export class MaterialResolver {
  constructor(private readonly materialService: MaterialService) {}

  // @Mutation(() => Material)
  // createMaterial(
  //     @Args("ma")
  // )
}
