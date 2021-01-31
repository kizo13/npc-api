import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './_shared/modules/database.module';
import { NpcsModule } from './npcs/npcs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MetaModule } from './meta/meta.module';
import { NotesModule } from './notes/notes.module';
import { AvatarsModule } from './avatars/avatars.module';
import { NamesModule } from './names/names.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ADMIN_USERS: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        SUPPORTED_FILE_MIME_TYPES: Joi.string().required(),
      }),
    }),
    MetaModule,
    DatabaseModule,
    NpcsModule,
    AuthModule,
    UsersModule,
    NotesModule,
    AvatarsModule,
    NamesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
