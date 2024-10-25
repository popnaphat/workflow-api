// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => ({
//         type: 'postgres',
//         host: config.get('DB_HOST'),
//         port: config.get('DB_PORT'),
//         username: config.get('DB_USERNAME'),
//         password: config.get('DB_PASSWORD'),
//         database: config.get('DB_DATABASE'),
//         autoLoadEntities: config.get('DB_AUTO_LOAD_ENTITIES'),
//         synchronize: config.get('DB_SYNCHRONIZE'),
//         ssl: {
//           rejectUnauthorized: false,  // Enforce SSL connection and allow self-signed certificates
//         },
//       }),
//     }),
//   ],
// })
// export class DbModule {}

// db.module.ts
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
  ],
})
export class DbModule {}
