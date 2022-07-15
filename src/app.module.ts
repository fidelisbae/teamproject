import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { AppService } from './app.service';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { FileModule } from './apis/file/file.module';
import { CourseModule } from './apis/course/course.module';
import { ReviewModule } from './apis/reivews/review.module';
import { AppController } from './app.controller';
import { CourseDateModule } from './apis/courseDate/courseDate.module';
import { SpecificScheduleModule } from './apis/specificSchedule/specificSchedule.module';

import { PickModule } from './apis/pick/pick.module';
import { CategoryModule } from './apis/category/category.module';

@Module({
  imports: [
    // 배포용
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '10.86.0.2',
    //   port: 3306,
    //   username: 'root',
    //   password: '12345',
    //   database: 'dabae-database',
    //   entities: [__dirname + '/apis/**/*.entity.*'],
    //   synchronize: true,
    //   logging: true,
    // }),
    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore,
    //   url: 'redis://10.86.1.3:6379',
    //   isGlobal: true,
    // }),

    // 로컬용
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
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
    ReviewModule,
    UserModule,
    AuthModule,
    FileModule,
    CategoryModule,
    CourseModule,
    CourseDateModule,
    SpecificScheduleModule,
    CategoryModule,
    PickModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
