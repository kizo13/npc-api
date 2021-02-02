import { Module } from '@nestjs/common';
import { NamesService } from './names.service';
import { NamesController } from './names.controller';
import Name from './name.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Name]), ConfigModule],
  controllers: [NamesController],
  providers: [NamesService],
  exports: [NamesService],
})
export class NamesModule {}
