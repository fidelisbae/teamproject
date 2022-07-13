import { Field, ObjectType } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategory/entities/maincategory.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => MainCategory)
  @Field(() => MainCategory)
  mainCategory: MainCategory;
}
