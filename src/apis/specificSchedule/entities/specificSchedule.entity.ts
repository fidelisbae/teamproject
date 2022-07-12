import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SpecificSchedule {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Date)
  courseStartTime: Date;

  @Column()
  @Field(() => Date)
  courseEndTime: Date;

  @Column({ default: 0 })
  @Field(() => Int)
  maxUsers: number;

  @Column({ default: 0 })
  @Field(() => Int)
  reservedPerson: number;
}
