import { Module } from '@nestjs/common';
import { PreviewService } from './preview.service';
import { PreviewController } from './preview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Note from 'src/notes/note.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), ConfigModule],
  controllers: [PreviewController],
  providers: [PreviewService],
  exports: [PreviewService],
})
export class PreviewModule {}
