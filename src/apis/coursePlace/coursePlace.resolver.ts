import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CoursePlaceService } from './coursePlace.service';
import { CoursePlace } from './entities/createCoursePlace.entity';

@Resolver()
export class CoursePlaceResolver {
  constructor(private readonly coursePlaceService: CoursePlaceService) {}

  @Mutation(() => CoursePlace)
  createCoursePlace(
    @Args('address') address: string,
    @Args('addressDetail') addressDetail: string,
    @Args('zipCode') zipCode: string,
    @Args('lat') lat: number,
    @Args('lng') lng: number,
  ) {
    return this.coursePlaceService.create({
      address,
      addressDetail,
      zipCode,
      lat,
      lng,
    });
  }
  @Query(() => CoursePlace)
  fetchCoursePlace(@Args('coursePlaceId') coursePlaceId: string) {
    return this.coursePlaceService.findOne({ coursePlaceId });
  }
}
