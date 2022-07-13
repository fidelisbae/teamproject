import { Field, ObjectType, Int } from '@nestjs/graphql';
import { CourseAddressService } from 'src/apis/courseAddress/courseAddress.service';
import { CourseAddress } from 'src/apis/courseAddress/entities/createCourseAddress.entity';
import { SubCategory } from 'src/apis/subCategory/entities/subCategry.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
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
  maxPrice: number;

  @Column()
  @Field(() => Int)
  minPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Field(() => String)
  difficulty: string;

  @Column()
  @Field(() => String)
  materials: string;

  @Column()
  @Field(() => String)
  contents: string;

  @CreateDateColumn()
  @Field(() => Date)
  openingDate: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  closingDate: Date;

  @ManyToOne(() => SubCategory)
  @Field(() => SubCategory)
  subCategory: SubCategory;

  @ManyToMany(() => User, (user) => user.course)
  @Field(() => [User], { nullable: true })
  user: User[];

  @OneToOne(() => CourseAddress)
  @JoinColumn()
  courseAddressService: CourseAddressService;

  @Column({ default: 0 })
  @Field(() => Int)
  pick: number;
}
