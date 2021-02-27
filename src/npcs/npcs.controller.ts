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
import RequestWithUser from 'src/_shared/dtos/request-with-user.dto';
import { JwtAuthGuard } from 'src/_shared/guards/jwt-auth.guard';
import FileService from 'src/_shared/services/file.service';
import CreateNpcDto from './dtos/create-npc.dto';
import NpcFilterDto from './dtos/npc-filter.dto';
import NpcsPaginatedDto from './dtos/npcs-paginated.dto';
import NpcsPaginationDto from './dtos/npcs-pagination.dto';
import UpdateNpcDto from './dtos/update-npc.dto';
import { NpcsService } from './npcs.service';

@UseGuards(JwtAuthGuard)
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
  getClasses(): Promise<string[]> {
    return this.npcsService.getClasses();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createNpc(
    @UploadedFile() file,
    @Body() npc: CreateNpcDto,
    @Req() request: RequestWithUser,
  ) {
    await this.fileService.checkMimeType(file);
    return this.npcsService.createNpc(file, npc, request.user.id);
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
