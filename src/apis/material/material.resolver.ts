import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Material } from './entities/material.entity';
import { MaterialService } from './material.service';

@Resolver()
export class MaterialResolver {
  constructor(private readonly materialService: MaterialService) {}

  @Mutation(() => Material)
  createMaterial(@Args('materal') material: string) {
    return this.materialService.create(material);
  }
  @Query(() => Material)
  async fetchMaterial(@Args('id') id: string) {
    return await this.materialService.findOne(id);
  }
}
