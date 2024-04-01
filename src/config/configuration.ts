/**
 * Main API config file
 */
import { registerAs } from '@nestjs/config';
import { AppConfig } from '../utils/types';

export default registerAs<AppConfig>('app', () => ({
  awsRegion: process.env.CONFIG_AWS_REGION,
  appName: process.env.CONFIG_APP_NAME || 'Manifest',
  apiPrefix: 'api',
  hostUrl: process.env.CONFIG_HOST_URL,
  frontHostUrl: process.env.CONFIG_FRONT_HOST_URL,
  rootHost: process.env.CONFIG_ROOT_HOST,
  appPort: Number(process.env.CONFIG_APP_PORT) || 3000,
  nodeEnv: process.env.CONFIG_NODE_ENV,
  allowedOrigins: process.env.CONFIG_ALLOWED_ORIGINS?.split(',') || [],
  database: {
    url: process.env.CONFIG_DATABASE_URL,
    type: process.env.CONFIG_DATABASE_TYPE,
    host: process.env.CONFIG_DATABASE_HOST,
    port: Number(process.env.CONFIG_DATABASE_PORT) || 5432,
    password: process.env.CONFIG_DATABASE_PASSWORD,
    name: process.env.CONFIG_DATABASE_NAME,
    username: process.env.CONFIG_DATABASE_USERNAME,
    synchronize: process.env.CONFIG_DATABASE_SYNCHRONIZE === 'true',
    maxConnections: Number(process.env.CONFIG_DATABASE_MAX_CONNECTIONS) || 100,
    sslEnabled: process.env.CONFIG_DATABASE_SSL_ENABLED === 'true',
    rejectUnauthorized:
      process.env.CONFIG_DATABASE_REJECT_UNAUTHORIZED === 'true',
    enableLogging: process.env.CONFIG_DATABASE_ENABLE_LOGGING === 'true',
  },
}));
