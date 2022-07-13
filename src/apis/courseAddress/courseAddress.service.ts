import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseAddress } from './entities/createCourseAddress.entity';

@Injectable()
export class CourseAddressService {
  constructor(
    @InjectRepository(CourseAddress)
    private readonly courseAddressRepository: Repository<CourseAddress>,
  ) {}

  async create({ address, addressDetail, zipCode, lat, lng }) {
    const result = await this.courseAddressRepository.save({
      address,
      addressDetail,
      zipCode,
      lat,
      lng,
    });

    return result;
  }
  async findOne({ courseAddressId }) {
    return await this.courseAddressRepository.findOne({
      where: { id: courseAddressId },
      relations: ['course'],
    });
  }
}
