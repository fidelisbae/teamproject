import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: '*',
  //   credentials: true,
  //   exposedHeaders: ['Authorization', 'Set-Cookie', 'Cookie'],
  // });
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
