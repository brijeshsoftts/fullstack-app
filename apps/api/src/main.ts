import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { env } from './config/env.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: env.CORS_ORIGIN,
  });
  app.use(cookieParser());
  app.use(helmet());
  app.setGlobalPrefix('api');

  const port = Number(env.PORT || 3000);
  const host = '0.0.0.0';

  await app.listen(port, host);

  logger.log(`🚀 Application running on: http://${host}:${port}`);
  logger.log(`🌍 Environment: ${env.NODE_ENV}`);
}

bootstrap().catch((error) => {
  console.error('Error starting application:', error);
});
