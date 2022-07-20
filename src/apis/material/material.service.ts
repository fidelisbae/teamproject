import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly MaterialRepository: Repository<Material>,
  ) {}

  async create(material) {
    const result = await this.MaterialRepository.save(material);
    return result;
  }

  async findOne(id) {
    return await this.MaterialRepository.findOne({
      where: { id: id },
    });
  }
}
