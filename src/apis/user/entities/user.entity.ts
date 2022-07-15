import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  phone: string;

  @Column({ default: null })
  @Field(() => Boolean, { nullable: true })
  gender: boolean;

  @Column()
  @Field(() => Boolean)
  isHost: boolean;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  account: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  bank: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  businessName: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  businessNumber: string;

  @Column({ default: null })
  @Field(() => Date, { nullable: true })
  birth: Date;

  @Column()
  @Field(() => Boolean)
  marketingAgreement: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
