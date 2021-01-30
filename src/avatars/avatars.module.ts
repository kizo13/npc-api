import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarsService } from './avatars.service';
import { AvatarsController } from './avatars.controller';
import Avatar from './avatar.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import FileService from 'src/_shared/services/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avatar]),
    ConfigModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AvatarsController],
  providers: [AvatarsService, FileService],
})
export class AvatarsModule {}
