import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationId, Repository } from 'typeorm';
import { Course } from '../course/entities/course.entity';
import { User } from '../user/entities/user.entity';
import { Pick } from './entities/pick.entity';

@Injectable()
export class PickService {
  constructor(
    @InjectRepository(Pick)
    private readonly pickRepository: Repository<Pick>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return await this.pickRepository.find();
  }

  async picksByUser(userID) {
    const allPicks = await this.pickRepository.find({
      relations: ['user', 'course'],
    });

    const result = [];
    for (let i = 0; i < allPicks.length; i++) {
      if (allPicks[i].user.id === userID) {
        result.push(allPicks[i].course.id);
      }
    }

    return result;
  }

  async create(course, user) {
    const pickedCourse = await this.courseRepository.findOne({
      where: { id: course },
    });
    const allPicks = await this.pickRepository.find({
      relations: ['user', 'course'],
    });
    for (let i = 0; i < allPicks.length; i++) {
      if (allPicks[i].user.id === user && allPicks[i].course.id === course) {
        pickedCourse.pick = pickedCourse.pick - 1;
        return await this.pickRepository.delete(allPicks[i]);
      }
    }

    pickedCourse.pick = pickedCourse.pick + 1;
    await this.courseRepository.save(pickedCourse);
    const result = await this.pickRepository.save({ course, user });
    return result;
  }
}
