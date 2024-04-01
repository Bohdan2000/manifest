/**
 * Utils types
 */

import { FindOptionsWhere } from 'typeorm';

export type DatabaseConfig = {
  type: string;
  host: string;
  port: number;
  password: string;
  name: string;
  username: string;
  synchronize: boolean;
  maxConnections: number;
  sslEnabled: boolean;
  rejectUnauthorized: boolean;
  enableLogging: boolean;
};

export type AppConfig = {
  awsRegion: string;
  appName: string;
  appPort: number;
  hostUrl: string;
  rootHost: string;
  apiPrefix: string;
  nodeEnv: string;
  allowedOrigins: string[];
  database: DatabaseConfig;
  frontHostUrl: string;
};

export type ConfigType = {
  app: AppConfig;
};

export enum NodeEnvs {
  local = 'local',
  production = 'production',
  development = 'development',
}

export type EntityCondition<T> = FindOptionsWhere<T>;

export type NullableType<T> = T | null;
