import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursePlace } from './entities/createCoursePlace.entity';

@Injectable()
export class CoursePlaceService {
  constructor(
    @InjectRepository(CoursePlace)
    private readonly CoursePlaceRepository: Repository<CoursePlace>,
  ) {}

  async create({ address, addressDetail, zipCode, lat, lng }) {
    const result = await this.CoursePlaceRepository.save({
      address,
      addressDetail,
      zipCode,
      lat,
      lng,
    });

    return result;
  }
  async findOne({ coursePlaceId }) {
    return await this.CoursePlaceRepository.findOne({
      where: { id: coursePlaceId },
      relations: ['course'],
    });
  }
}
