import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialResolver } from './material.resolver';
import { MaterialService } from './material.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [MaterialResolver, MaterialService],
})
export class MaterialModule {}
