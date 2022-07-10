import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './apis/course/course.module';
import { ReviewModule } from './apis/reivews/review.module';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { FileModule } from './apis/file/file.module';
import { MainCategory } from './apis/mainCategory/entities/maincategory.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '172.21.16.7',
    //   port: 3306,
    //   username: 'root',
    //   password: '3565',
    //   database: 'dabae-database',
    //   entities: [__dirname + '/apis/*/.entity.*'],
    //   synchronize: true,
    //   logging: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'dabae-database',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/commons/graphql/schema.gql',
      cors: {
        origin: '*',
        credential: 'include',
        exposedHeaders: ['Authorization', 'Set-Cookie', 'Cookie'],
      },
    }),
    CourseModule,
    ReviewModule,
    UserModule,
    AuthModule,
    FileModule,
    MainCategory,
  ],
})
export class AppModule {}
