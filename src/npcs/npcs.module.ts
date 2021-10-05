import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NpcsService } from './npcs.service';
import { NpcsController } from './npcs.controller';
import Npc from './npc.entity';
import { AuthModule } from 'src/auth/auth.module';
import FileService from '@shared/services/file.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Npc]),
    ConfigModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [NpcsController],
  providers: [NpcsService, FileService],
  exports: [NpcsService],
})
export class NpcsModule {}
