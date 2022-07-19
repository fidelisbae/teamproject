import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseDate } from './entities/courseDate.entity';

@Injectable()
export class CourseDateService {
  constructor(
    @InjectRepository(CourseDate)
    private readonly courseDateRepository: Repository<CourseDate>,
  ) {}
  async create({
    courseDate,
    recruitmentStartDate,
    recruitmentEndDate,
    courseId,
  }) {
    const result = await this.courseDateRepository.save({
      courseDate,
      recruitmentStartDate,
      recruitmentEndDate,
      course: { id: courseId },
    });
    return result;
  }

  async findOne({ courseDateId }) {
    return await this.courseDateRepository.findOne({
      where: { id: courseDateId },
    });
  }
}
