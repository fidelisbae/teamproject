import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecificSchedule } from './entities/specificSchedule.entity';

@Injectable()
export class SpecificScheduleService {
  constructor(
    @InjectRepository(SpecificSchedule)
    private readonly specificScheduleRepository: Repository<SpecificSchedule>,
  ) {}
  async create({ createSpecificScheduleInput }) {
    const result = await this.specificScheduleRepository.save({
      ...createSpecificScheduleInput,
    });
    return result;
  }

  async update({ specificScheduleId, updateSpecificScheduleInput }) {
    const myclass = await this.specificScheduleRepository.findOne({
      where: { id: specificScheduleId },
    });
    const newCourse = {
      ...myclass,
      id: specificScheduleId,
      ...updateSpecificScheduleInput,
    };
    return await this.specificScheduleRepository.save(newCourse);
  }

  async findAll() {
    return await this.specificScheduleRepository.find({
      relations: ['courseDate'],
    });
  }
  async delete({ specificScheduleId }) {
    const result = await this.specificScheduleRepository.softDelete({
      id: specificScheduleId,
    });
    return result.affected ? true : false;
  }
}
