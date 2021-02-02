import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get('PORT'));
  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port, async () => {
    const url = await app.getUrl();
    const address = `http://${url}:${port}/`;
    Logger.log(`Listening at ${address}`);
  });
}
bootstrap();
