import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseDate } from 'src/apis/courseDate/entities/courseDate.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SpecificSchedule {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  courseStartTime: string;

  @Column()
  @Field(() => String)
  courseEndTime: string;

  @Column()
  @Field(() => Int)
  maxUsers: number;

  @Column({ default: 0 })
  @Field(() => Int)
  reservedPerson: number;

  @Column()
  @Field(() => Date)
  recruitmentStartDate: Date;

  @Column()
  @Field(() => Date)
  recruitmentEndDate: Date;

  @ManyToOne(() => CourseDate)
  @Field(() => CourseDate)
  courseDate: CourseDate;
}
