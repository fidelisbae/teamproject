import { Query, Resolver } from '@nestjs/graphql';
import {} from '../user/entities/user.entity';
import { CourseService } from './course.service';

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}
}
