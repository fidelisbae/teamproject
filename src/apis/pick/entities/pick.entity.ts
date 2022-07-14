import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from 'src/apis/course/entities/course.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Pick {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @JoinColumn()
  @ManyToOne(() => Course)
  @Field(() => Course)
  course: Course;

  @JoinColumn()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
