import { NestFactory, Reflector } from '@nestjs/core';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as express from 'express';
import { ConfigType } from './utils/types';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(`API_${process.env.NODE_APP_INSTANCE || 0}`),
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService<ConfigType>);
  const globalPrefix = configService.getOrThrow('app.apiPrefix', {
    infer: true,
  });
  const appPort = configService.getOrThrow('app.appPort', { infer: true });
  const frontHost = configService.getOrThrow('app.frontHostUrl', {
    infer: true,
  });

  const allowedOrigins = configService.getOrThrow('app.allowedOrigins', {
    infer: true,
  });
  allowedOrigins.push(frontHost);

  app.enableCors({
    origin: (origin, cb) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix(globalPrefix, {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableShutdownHooks();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  const doc = new DocumentBuilder()
    .setTitle('Manifest API v1')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Manifest API v1',
  });

  await app.listen(appPort);
}
void bootstrap();
