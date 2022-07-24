import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CourseDateService } from './courseDate.service';
import { CourseDate } from './entities/courseDate.entity';

@Resolver()
export class CourseDateResolver {
  constructor(private readonly courseDateService: CourseDateService) {}

  @Mutation(() => CourseDate)
  createCourseDate(
    @Args('courseDay') courseDay: Date,
    @Args('courseId') courseId: string,
  ) {
    return this.courseDateService.create({
      courseDay,
      courseId,
    });
  }

  @Query(() => CourseDate)
  async fetchCourseDate(@Args('courseDateId') courseDateId: string) {
    return await this.courseDateService.findOne({ courseDateId });
  }
}
