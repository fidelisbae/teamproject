import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { SubCategory } from 'src/apis/subCategory/entities/subCategry.entity';
import { User } from 'src/apis/user/entities/user.entity';
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

  @ManyToOne(() => SubCategory)
  @Field(() => SubCategory)
  subCategory: SubCategory;

  @JoinTable()
  @ManyToMany(() => User, (user) => user.id)
  @Field(() => [User])
  user: User[];
}
