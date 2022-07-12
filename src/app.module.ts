import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './apis/course/course.module';
import { ReviewModule } from './apis/reivews/review.module';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { FileModule } from './apis/file/file.module';
import { MainCategory } from './apis/mainCategory/entities/maincategory.entity';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CourseDateModule } from './apis/courseDate/courseDate.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CoursePlaceModule } from './apis/coursePlace/coursePlace.module';

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
      host: '10.86.0.2',
      port: 3306,
      username: 'root',
      password: '12345',
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
      context: ({ req, res }) => ({ req, res }),
    }),

    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://10.86.1.3:6379',
      isGlobal: true,
    }),

    ReviewModule,
    UserModule,
    AuthModule,
    FileModule,
    MainCategory,
    CourseModule,
    CourseDateModule,
    CoursePlaceModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
