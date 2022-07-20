import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(() => Course, (course) => course.material)
  @Field(() => [Course])
  course: Course[];
}
