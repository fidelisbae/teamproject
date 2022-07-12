import { Module } from '@nestjs/common';
import { fileResolve } from './file.resolver';
import { FileService } from './file.service';

@Module({
  providers: [fileResolve, FileService],
})
export class FileModule {}
