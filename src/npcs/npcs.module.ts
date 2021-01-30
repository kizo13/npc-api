import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NpcsService } from './npcs.service';
import { NpcsController } from './npcs.controller';
import Npc from './npc.entity';
import { AuthModule } from 'src/auth/auth.module';
import FileService from 'src/_shared/services/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Npc]), ConfigModule, AuthModule],
  controllers: [NpcsController],
  providers: [NpcsService, FileService],
  exports: [NpcsService],
})
export class NpcsModule {}
