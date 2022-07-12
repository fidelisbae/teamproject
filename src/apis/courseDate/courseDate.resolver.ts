import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CourseDateService } from './courseDate.service';
import { CourseDate } from './entities/courseDate.entity';

@Resolver()
export class CourseDateResolver {
  constructor(private readonly courseDateService: CourseDateService) {}

  @Mutation(() => CourseDate)
  createCourseDate(
    @Args('courseDate') courseDate: Date,
    @Args('recruitmentStartDate') recruitmentStartDate: Date,
    @Args('recruitmentEndDate') recruitmentEndDate: Date,
  ) {
    return this.courseDateService.create({
      courseDate,
      recruitmentStartDate,
      recruitmentEndDate,
    });
  }

  @Query(() => CourseDate)
  fethchCourseDate(@Args('courseDateId') courseDateId: string) {
    return this.courseDateService.findOne({ courseDateId });
  }
}
