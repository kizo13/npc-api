import { InternalServerErrorException, Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: ['dist/**/*.entity.js'],
        migrationsTableName: 'migration',
        migrations: ['dist/src/migrations/**/*.js'],
      }),
    }),
    ConfigModule,
  ],
})
export class DatabaseModule {
  constructor(private readonly configService: ConfigService) {
    this.migrate();
  }

  private async migrate() {
    try {
      const connection = await createConnection({
        type: 'postgres',
        host: this.configService.get('POSTGRES_HOST'),
        port: this.configService.get('POSTGRES_PORT'),
        username: this.configService.get('POSTGRES_USER'),
        password: this.configService.get('POSTGRES_PASSWORD'),
        database: this.configService.get('POSTGRES_DB'),
        entities: ['dist/**/*.entity.js'],
        migrationsTableName: 'migration',
        migrations: ['dist/src/migrations/**/*.js'],
      });
      await connection.runMigrations();
    } catch (error) {
      Logger.error('Error while migrating the database', error);
      throw new InternalServerErrorException(error);
    }
  }
}
