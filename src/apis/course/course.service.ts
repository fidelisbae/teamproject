import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/categry.entity';
import { Image } from '../image/entities/image.entity';
import { User } from '../user/entities/user.entity';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ courseId }) {
    const result = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: [
        'host',
        'imageURLs',
        'courseDate',
        'courseDate.specificSchedule',
      ],
    });

    console.log(result);
    return result;
  }
  async findAll(page) {
    return await this.courseRepository.find({
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  async findCount() {
    return await this.courseRepository.count();
  }

  async search(input: string) {
    const allCourses = await this.courseRepository.find();
    const result = [];
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].name.includes(input)) {
        result.push(allCourses[i]);
      }
    }
    return result;
  }

  // 인기코스, pick이 높은 순서대로 뽑는다. j의 크기만큼의 갯수를 리턴함
  async hotCourses() {
    const allCourses = await this.courseRepository.find();
    const result = [];
    for (let j = 0; j < 4; j++) {
      let max = allCourses[0];
      let num = 0;
      for (let i = 0; i < allCourses.length; i++) {
        if (max.pick < allCourses[i].pick) {
          max = allCourses[i];
          num = i;
        }
      }
      allCourses.splice(num, 1);
      result.push(max);
    }
    return result;
  }

  async create({ createCourseInput, currentUser }) {
    const { imageURLs, category, ...items } = createCourseInput;
    let categoryResult = await this.categoryRepository.findOne({
      where: { name: category },
    });

    const hostUser = await this.userRepository.findOne({
      where: { email: currentUser.email },
    });

    if (!categoryResult) {
      categoryResult = await this.categoryRepository.save({
        name: category,
      });
    }

    // const imgs = await Promise.all(
    //   imageURLs.map((url) => {
    //     return this.imageRepository.save({
    //       imageURLs: url,
    //     });
    //   }),
    // );

    const result = await this.courseRepository.save({
      ...items,
      category: categoryResult,
      // imageURLs: imgs,
      host: hostUser,
    });
    return result;
  }

  async update({ courseId, updateCourseInput }) {
    const { imageURLs, ...updateCourse } = updateCourseInput;
    const myCourse = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    const prevImage = await this.imageRepository.find({
      where: { course: { id: courseId } },
    });
    const prevUrl = prevImage.map((imageURLs) => imageURLs.imageURLs);

    await Promise.all(
      imageURLs.map((image) => {
        if (!prevUrl.includes(image)) {
          return this.imageRepository.save({
            imageURLs: image,
            course: { id: courseId },
          });
        }
      }),
    );
    const newCourse = {
      ...myCourse,
      id: courseId,
      ...updateCourse,
    };
    return await this.courseRepository.save(newCourse);
  }

  async delete({ courseId }) {
    const result = await this.courseRepository.softDelete({ id: courseId });
    return result.affected ? true : false;
  }
}
