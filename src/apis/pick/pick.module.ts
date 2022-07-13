import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pick } from './entities/pick.entity';
import { PickResolver } from './pick.resolver';
import { PickService } from './pick.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pick])],
  providers: [PickResolver, PickService],
})
export class PickModule {}
