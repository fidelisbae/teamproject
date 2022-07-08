import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: null })
  @Field(() => Int)
  pick: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Field(() => Date)
  courseStartTime: Date;

  @Column()
  @Field(() => Date)
  courseEndTime: Date;

  @Column()
  @Field(() => String)
  imageUrl: string;

  @Column({ default: null })
  @Field(() => Int)
  currentUsers: number;

  @Column({ default: null })
  @Field(() => Int)
  maxUsers: number;

  @Column()
  @Field(() => String)
  region: string;

  @Column({ default: null })
  @Field(() => Int)
  maxDiscount: number;

  @Column()
  @Field(() => String)
  difficulty: string;

  @Column()
  @Field(() => String)
  materials: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => String)
  zipCode: string;

  @Column()
  @Field(() => String)
  contents: string;

  //   @JoinTable()
  //   @ManyToMany(() => User, user => user.id )
  //   @Field(()=> [User])
  //   user: User[];

  // @ManyToOne(() => Course)
  // @Field(() => Course)
  // course: Course;
}
