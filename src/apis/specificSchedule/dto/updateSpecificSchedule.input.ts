import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSpecificScheduleInput } from './createSpecificSchedule.input';

@InputType()
export class UpdateSpecificScheduleInput extends PartialType(
  CreateSpecificScheduleInput,
) {}
