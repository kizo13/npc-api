import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from '@shared/modules/database.module';
import { NpcsModule } from './npcs/npcs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MetaModule } from './meta/meta.module';
import { NotesModule } from './notes/notes.module';
import { AvatarsModule } from './avatars/avatars.module';
import { NamesModule } from './names/names.module';
import { PreviewModule } from './preview/preview.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ADMIN_USERS: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().required(),
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
    PreviewModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
