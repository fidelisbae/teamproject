import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from '../course/course.module';
import { Image } from '../image/entities/image.entity';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), CourseModule],
  providers: [FileResolver, FileService],
})
export class FileModule {}
