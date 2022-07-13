import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CourseAddressService } from './courseAddress.service';
import { CourseAddress } from './entities/createCourseAddress.entity';

@Resolver()
export class CourseAddressResolver {
  constructor(private readonly courseAddressService: CourseAddressService) {}

  @Mutation(() => CourseAddress)
  createCourseAddress(
    @Args('address') address: string,
    @Args('addressDetail') addressDetail: string,
    @Args('zipCode') zipCode: string,
    @Args('lat') lat: number,
    @Args('lng') lng: number,
  ) {
    return this.courseAddressService.create({
      address,
      addressDetail,
      zipCode,
      lat,
      lng,
    });
  }
  @Query(() => CourseAddress)
  fetchCourseAddress(@Args('courseAddressId') courseAddressId: string) {
    return this.courseAddressService.findOne({ courseAddressId });
  }
}
