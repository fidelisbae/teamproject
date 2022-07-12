import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class CoursePlace {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => String)
  zipCode: string;

  @Column({ type: 'decimal', precision: 9, scale: 7 })
  @Field(() => Float)
  lat: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  @Field(() => Float)
  lng: number;
}
