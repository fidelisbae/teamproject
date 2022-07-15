import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Float)
  score: number;

  @Column()
  @Field(() => String)
  content: string;

  @CreateDateColumn()
  created_At: Date;

  @Column()
  @Field(() => String)
  url: string;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course: Course;

  //     @ManyToOne(() => User)
  //     @Field(() => User)
  //     writer : User;
}
