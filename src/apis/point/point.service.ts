import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICurrentUser } from 'src/common/auth/gql.user.param';
import { Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { User } from '../user/entities/user.entity';
import { Point } from './entities/point.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly iamportService: IamportService,
  ) {}

  async fetchPoints(currentUser: ICurrentUser) {
    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    const result = await this.pointRepository.find({
      where: { user: user },
      relations: ['user'],
    });

    return result;
  }

  async charge(currentUser: ICurrentUser, amount: number, impUid: string) {
    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    try {
      await this.iamportService.getData({ impUid });

      const result = await this.pointRepository.save({
        addedPoint: amount,
        user: user,
      });

      await this.userRepository.save({
        ...user,
        point: user.point + amount,
      });

      return result;
    } catch {
      throw new ConflictException('결제오류발생');
    }
  }

  async usePoint(currentUser: ICurrentUser, amount: number) {
    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    try {
      const result = await this.pointRepository.save({
        addedpoint: 0 - amount,
        user: user,
      });

      await this.userRepository.save({
        ...user,
        point: user.point - amount,
      });

      return result;
    } catch {
      throw new ConflictException('포인트사용실패');
    }
  }
}
