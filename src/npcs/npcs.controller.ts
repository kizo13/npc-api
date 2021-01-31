import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import FindOneParams from 'src/_shared/classes/find-one-param';
import { AuthGuard } from 'src/_shared/guards/auth.guard';
import FileService from 'src/_shared/services/file.service';
import CreateNpcDto from './dtos/create-npc.dto';
import NpcFilterDto from './dtos/npc-filter.dto';
import NpcsPaginatedDto from './dtos/npcs-paginated.dto';
import NpcsPaginationDto from './dtos/npcs-pagination.dto';
import UpdateNpcDto from './dtos/update-npc.dto';
import { NpcsService } from './npcs.service';

@UseGuards(AuthGuard)
@Controller('npcs')
export class NpcsController {
  constructor(
    private readonly npcsService: NpcsService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getAll(
    @Query() paginationDto: NpcsPaginationDto,
    @Query('filter') filterDto: NpcFilterDto,
  ): Promise<NpcsPaginatedDto> {
    return this.npcsService.findAll(paginationDto, filterDto);
  }

  @Get('classes')
  getClasses(@Query('filter') filter: string): Promise<string[]> {
    return this.npcsService.getClasses(filter);
  }

  @Get('cultures')
  getCultures(): string[] {
    return this.npcsService.getCultures();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createNpc(@UploadedFile() file, @Body() npc: CreateNpcDto, @Req() req) {
    await this.fileService.checkMimeType(file);
    return this.npcsService.createNpc(file, npc, req);
  }

  @Put(':id')
  updateNpc(@Param() { id }: FindOneParams, @Body() npc: UpdateNpcDto) {
    return this.npcsService.updateNpc(id, npc);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteNpc(@Param() { id }: FindOneParams) {
    return this.npcsService.deleteNpc(id);
  }
}
