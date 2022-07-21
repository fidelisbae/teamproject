import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Material } from './entities/material.entity';
import { MaterialService } from './material.service';

@Resolver()
export class MaterialResolver {
  constructor(private readonly materialService: MaterialService) {}

  @Mutation(() => Material)
  createMaterial(@Args('materals') materials: string) {
    return this.materialService.create(materials);
  }
  @Query(() => Material)
  async fetchMaterial(@Args('id') id: string) {
    return await this.materialService.findOne(id);
  }
}
