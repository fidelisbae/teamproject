import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql.auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql.user.param';
import { CourseService } from './course.service';
import { CreateCourseInput } from './dto/create.course.input';
import { UpdateCourseInput } from './dto/update.course.input';
import { Course } from './entities/course.entity';

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => Course)
  async fetchCourse(@Args('courseId') courseId: string) {
    return await this.courseService.findOne({ courseId });
  }

  @Query(() => [Course], { nullable: true })
  async fetchCoursesSortBycreated(
    @Args('search') search: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.courseService.searchSortByCreated(search, page);
  }

  @Query(() => [Course], { nullable: true })
  async fetchCoursesSortByPick(
    @Args('search') search: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.courseService.searchSortByPick(search, page);
  }

  @Query(() => [Course], { nullable: true })
  async fetchCoursesSortByDiscount(
    @Args('search') search: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.courseService.searchSortByDiscount(search, page);
  }

  @Query(() => [Course])
  async hotCourses() {
    return await this.courseService.hotCourses();
  }

  @Query(() => [Course])
  async newCourses() {
    return await this.courseService.newCourses();
  }

  @Query(() => [Course])
  async cheapCourses() {
    return await this.courseService.cheapCourses();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Course)
  createCourse(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.courseService.create({ createCourseInput, currentUser });
  }

  // 호스트 본인이 쓴 글만 수정할 수 있도록 해야함
  @Mutation(() => Course) //호스트가 바꾸는 거
  async updateCourse(
    @Args('courseId') courseId: string,
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
  ) {
    return await this.courseService.update({
      courseId,
      updateCourseInput,
    });
  }

  // 호스트 본인이 쓴 글만 삭제할 수 있도록 해야함
  @Mutation(() => Boolean)
  deleteCourse(
    @Args('courseId') courseId: string, //
  ) {
    return this.courseService.delete({ courseId });
  }
}
