import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from '../course/course.module';
import { Image } from '../image/entities/image.entity';
import { fileResolve } from './file.resolver';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), CourseModule],
  providers: [fileResolve, FileService],
})
export class FileModule {}
