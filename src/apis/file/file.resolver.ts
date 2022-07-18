// import { Args, Mutation, Resolver } from '@nestjs/graphql';
// import { FileUpload, GraphQLUpload } from 'graphql-upload';
// import { FileService } from './file.service';

// @Resolver()
// export class fileResolve {
//   constructor(private readonly fileService: FileService) {}

//   @Mutation(() => [String])
//   uploadFile(
//     @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
//     @Args('courseID') courseID: string,
//   ) {
//     return this.fileService.upload(files, courseID);
//   }
// }
