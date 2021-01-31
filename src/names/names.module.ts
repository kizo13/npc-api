import { Module } from '@nestjs/common';
import { NamesService } from './names.service';
import { NamesController } from './names.controller';
import Name from './name.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Name])],
  controllers: [NamesController],
  providers: [NamesService],
  exports: [NamesService],
})
export class NamesModule {}
