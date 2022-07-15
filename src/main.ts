import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModuleLocal } from './app.moduleLocal';

async function bootstrap() {
  const app = await NestFactory.create(AppModuleLocal);
  app.use(graphqlUploadExpress());
  await app.listen(3000);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
}
bootstrap();
