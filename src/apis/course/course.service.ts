import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../Category/entities/Categry.entity';
import { Image } from '../image/entities/image.entity';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
  ) {}

  async create({ createCourseInput }) {
    const { category, ...items } = createCourseInput;
    let categoryResult = await this.CategoryRepository.findOne({
      where: { name: category },
    });

    if (!categoryResult) {
      categoryResult = await this.CategoryRepository.save({
        name: category,
      });
    }

    const result = await this.courseRepository.save({
      ...items,
      category: categoryResult.id,
    });
    return result;
  }

  async findOne({ courseId }) {
    return await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['category', 'review', 'user', 'payment'],
    });
  }
  async findAll() {
    return await this.courseRepository.find();
  }

  async update({ courseId, updateCourseInput }) {
    const { imageurls, ...updateCourse } = updateCourseInput;
    const myCourse = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    const prevImage = await this.imageRepository.find({
      where: { course: { id: courseId } },
    });
    const prevUrl = prevImage.map((imageurls) => imageurls.url);

    await Promise.all(
      imageurls.map((image) => {
        if (!prevUrl.includes(image)) {
          return this.imageRepository.save({
            imageurls: image,
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
