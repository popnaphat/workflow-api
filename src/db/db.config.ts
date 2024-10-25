//db.config.ts
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

console.log('before', process.env.DB_HOST);

// Load .env configuration
dotenvConfig();

console.log('after', process.env.DB_HOST);

export const dbConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // ssl: process.env.DB_SSL === 'true', // Convert string to boolean
  // extra: {
  //   ssl: process.env.DB_SSL === 'true' ? {
  //     rejectUnauthorized: false, // Skip verifying the SSL certificate
  //   } : undefined, // Avoid adding 'extra.ssl' if not needed
  // },
  autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === 'true', // Convert string to boolean
  synchronize: process.env.DB_SYNCHRONIZE === 'true', // Convert string to boolean
  entities: ['dist/**/*.entity.js'], // Adjust based on your project structure
  migrations: ['dist/migrations/*.js'], // Migration path
};

export default registerAs('typeorm', () => dbConfig);

export const dataSource = new DataSource(dbConfig as DataSourceOptions);
