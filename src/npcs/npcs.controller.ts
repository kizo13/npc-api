import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import FindOneParams from 'src/_shared/classes/find-one-param';
import { AuthGuard } from 'src/_shared/guards/auth.guard';
import CreateNpcDto from './dtos/create-npc.dto';
import NpcFilterDto from './dtos/npc-filter.dto';
import UpdateNpcDto from './dtos/update-npc.dto';
import Npc from './npc.entity';
import { NpcsService } from './npcs.service';

@UseGuards(AuthGuard)
@Controller('npcs')
export class NpcsController {
  constructor(private readonly npcsService: NpcsService) {}

  @Get()
  getAll(@Query() filterDto: NpcFilterDto): Promise<Npc[]> {
    return this.npcsService.findAll(filterDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createNpc(@UploadedFile() file, @Body() npc: CreateNpcDto, @Req() req) {
    return this.npcsService.createNpc(file, npc, req);
  }

  @Put(':id')
  updateNpc(@Param() { id }: FindOneParams, @Body() npc: UpdateNpcDto) {
    return this.npcsService.updateNpc(Number(id), npc);
  }

  @Delete(':id')
  deleteNpc(@Param() { id }: FindOneParams) {
    return this.npcsService.deleteNpc(Number(id));
  }
}
