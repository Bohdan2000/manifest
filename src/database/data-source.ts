import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: process.env.CONFIG_DATABASE_TYPE,
  url: process.env.CONFIG_DATABASE_URL,
  host: process.env.CONFIG_DATABASE_HOST,
  port: process.env.CONFIG_DATABASE_PORT
    ? parseInt(process.env.CONFIG_DATABASE_PORT, 10)
    : 5432,
  username: process.env.CONFIG_DATABASE_USERNAME,
  password: process.env.CONFIG_DATABASE_PASSWORD,
  database: process.env.CONFIG_DATABASE_NAME,
  synchronize: process.env.CONFIG_DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.CONFIG_DATABASE_ENABLE_LOGGING === 'true',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
  extra: {
    max: process.env.CONFIG_DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.CONFIG_DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    ssl:
      process.env.CONFIG_DATABASE_SSL_ENABLED === 'true'
        ? {
            rejectUnauthorized:
              process.env.CONFIG_DATABASE_REJECT_UNAUTHORIZED === 'true',
          }
        : undefined,
  },
} as DataSourceOptions);
