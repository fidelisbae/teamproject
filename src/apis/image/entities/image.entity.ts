import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../course/entities/course.entity';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isThumbnail: boolean;

  @Column()
  @Field(() => String)
  imageURLs: string;

  @ManyToOne(() => Course, (course) => course.imageURLs)
  @Field(() => Course)
  course: Course;
}
