
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseService } from './course.service';
import { CreateCourseInput } from './dto/create.course.input';
import { Course } from './entities/course.entity';

@Resolver()
export class CourseResolver {
  constructor(
    private readonly courseService: CourseService,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  @Mutation(() => Course)
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.courseService.create({
      createCourseInput,
    });
  }
  @Query(() => Course)
  fetchCourse(@Args('courseId') courseId: string) {
    return this.courseService.findOne({ courseId });
  }

  @Query(() => [Course])
  async fetchCourses() {
    return await this.courseService.findAll();
  }
}
