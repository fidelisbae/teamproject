import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { SpecificSchedule } from 'src/apis/specificSchedule/entities/specificSchedule.entity';
import { SubCategory } from 'src/apis/subCategory/entities/subCategry.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @Column({ default: null })
  @Field(() => Date)
  courseDate: Date;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => String)
  zipCode: string;

  @Column({ type: 'decimal', precision: 16, scale: 13 })
  @Field(() => Float)
  lat: number;

  @Column({ type: 'decimal', precision: 16, scale: 13 })
  @Field(() => Float)
  lng: number;

  @OneToMany(() => SpecificSchedule, (specificSchedule) => specificSchedule.id)
  @Field(() => SpecificSchedule)
  specificSchedule: SpecificSchedule;

  @ManyToOne(() => SubCategory)
  @Field(() => SubCategory, { nullable: true })
  subCategory: SubCategory;

  // @ManyToMany(() => User, (user) => user.course)
  // @Field(() => [User], { nullable: true })
  // user: User[];

  @Column({ default: 0 })
  @Field(() => Int)
  pick: number;
}
