import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../course/entities/course.entity';

@Entity()
@ObjectType()
export class Material {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  material: string;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course: Course;
}
