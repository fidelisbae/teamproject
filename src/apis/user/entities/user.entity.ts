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

  @Column({ default: null })
  @Field(() => String)
  email: string;

  @Column({ default: null })
  @Field(() => String)
  password: string;

  @Column({ default: null })
  @Field(() => String)
  nickname: string;

  @Column({ default: null })
  @Field(() => String)
  phone: string;

  @Column({ default: null })
  @Field(() => String)
  gender: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isHost: boolean;

  @Column({ default: null })
  @Field(() => String)
  account: string;

  @Column({ default: null })
  @Field(() => String)
  businessName: string;

  @Column({ default: null })
  @Field(() => String)
  businessNumber: string;

  @Column({ default: null })
  @Field(() => Date)
  birth: Date;

  @Column({ default: null })
  @Field(() => Boolean)
  marketingAgreement: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
