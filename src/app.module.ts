import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './apis/course/course.module';
import { ReviewModule } from './apis/reivews/review.module';
import { UserModule } from './apis/user/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './apis/auth/auth.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

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
      host: 'localhost',
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
      autoSchemaFile: './src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://localhost:6379',
      isGlobal: true,
    }),
    CourseModule,
    ReviewModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
