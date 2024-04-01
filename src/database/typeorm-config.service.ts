import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigType } from '../utils/types';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<ConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.getOrThrow('app.database.type', { infer: true }),
      host: this.configService.getOrThrow('app.database.host', { infer: true }),
      port: this.configService.getOrThrow('app.database.port', { infer: true }),
      username: this.configService.getOrThrow('app.database.username', {
        infer: true,
      }),
      password: this.configService.getOrThrow('app.database.password', {
        infer: true,
      }),
      database: this.configService.getOrThrow('app.database.name', {
        infer: true,
      }),
      synchronize: this.configService.getOrThrow('app.database.synchronize', {
        infer: true,
      }),
      dropSchema: false,
      keepConnectionAlive: true,
      logging: this.configService.getOrThrow('app.database.enableLogging', {
        infer: true,
      }),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/app.database/migrations',
        subscribersDir: 'subscriber',
      },
      extra: {
        max: this.configService.getOrThrow('app.database.maxConnections', {
          infer: true,
        }),
        ssl: this.configService.getOrThrow('app.database.sslEnabled', {
          infer: true,
        })
          ? {
              rejectUnauthorized: this.configService.getOrThrow(
                'app.database.rejectUnauthorized',
                { infer: true },
              ),
            }
          : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
