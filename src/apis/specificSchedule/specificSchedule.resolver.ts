import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateSpecificScheduleInput } from './dto/createSpecificSchedule.input';
import { UpdateSpecificScheduleInput } from './dto/updateSpecificSchedule.input';
import { SpecificSchedule } from './entities/specificSchedule.entity';
import { SpecificScheduleService } from './specificSchedule.service';

@Resolver()
export class SpecificScheduleResolver {
  constructor(
    private readonly specificSheduleService: SpecificScheduleService,
  ) {}

  @Mutation(() => SpecificSchedule)
  createSpecificSchedule(
    @Args('createSpecificScheduleInput')
    createSpecificScheduleInput: CreateSpecificScheduleInput,
  ) {
    return this.specificSheduleService.create({ createSpecificScheduleInput });
  }

  @Mutation(() => SpecificSchedule)
  async updateSpecificSchedule(
    @Args('specificScheduleId') specificScheduleId: string,
    @Args('updateSpecificScheduleInput')
    updateSpecificScheduleInput: UpdateSpecificScheduleInput,
  ) {
    return await this.specificSheduleService.update({
      specificScheduleId,
      updateSpecificScheduleInput,
    });
  }
  @Query(() => SpecificSchedule)
  fetchSpecificSchedule(
    @Args('specificScheduleId') specificScheduleId: string,
  ) {
    return this.specificSheduleService.findOne({ specificScheduleId });
  }

  @Mutation(() => Boolean)
  deleteSpecificSchedule(
    @Args('specificScheduleId') specificScheduleId: string,
  ) {
    return this.specificSheduleService.delete({ specificScheduleId });
  }
}
