import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePickInput } from './dto/createPick.input';
import { Pick } from './entities/pick.entity';
import { PickService } from './pick.service';

@Resolver()
export class PickResolver {
  constructor(private readonly pickService: PickService) {}

  @Query(() => [Pick])
  async fetchPicks() {
    return await this.pickService.findAll();
  }

  @Mutation(() => Pick)
  async createPick(@Args('createPickInput') createPickInput: CreatePickInput) {
    return await this.pickService.create(createPickInput);
  }
}
