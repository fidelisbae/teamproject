import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql.user.param';
import { CourseService } from './course.service';
import { CreateCourseInput } from './dto/create.course.input';
import { UpdateCourseInput } from './dto/update.course.input';
import { Course } from './entities/course.entity';

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Course)
  createCourse(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.courseService.create(createCourseInput);
  }

  @Query(() => Course)
  fetchCourse(@Args('courseId') courseId: string) {
    return this.courseService.findOne({ courseId });
  }

  @Query(() => [Course])
  async fetchCourses() {
    return await this.courseService.findAll();
  }

  @Mutation(() => Course) //호스트가 바꾸는 거
  async updateCourse(
    @Args('courseId') courseId: string,
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
  ) {
    return await this.courseService.update({ courseId, updateCourseInput });
  }

  @Mutation(() => Boolean)
  deleteCourse(
    @Args('courseId') courseId: string, //
  ) {
    return this.courseService.delete({ courseId });
  }
}
