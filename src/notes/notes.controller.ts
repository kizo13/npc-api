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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import FindOneParams from 'src/_shared/classes/find-one-param';
import PaginatedDto from 'src/_shared/dtos/paginated.dto';
import RequestWithUser from 'src/_shared/dtos/request-with-user.dto';
import { JwtAuthGuard } from 'src/_shared/guards/jwt-auth.guard';
import CreateNoteDto from './dtos/create-note.dto';
import NoteFilterDto from './dtos/note-filter.dto';
import NotesPaginationDto from './dtos/notes-pagination.dto';
import UpdateNoteDto from './dtos/update-note.dto';
import Note from './note.entity';
import { NotesService } from './notes.service';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getAll(
    @Query() paginationDto: NotesPaginationDto,
    @Query('filter') filterDto: NoteFilterDto,
    @Req() request: RequestWithUser,
  ): Promise<PaginatedDto<Note>> {
    return this.notesService.findAll(paginationDto, filterDto, request.user.id);
  }

  @Get(':id')
  getUserById(@Param() { id }: FindOneParams): Promise<Note> {
    return this.notesService.findOne(id);
  }

  @Post()
  async createNote(
    @Body() npc: CreateNoteDto,
    @Req() request: RequestWithUser,
  ) {
    return this.notesService.createNote(npc, request.user.id);
  }

  @Put(':id')
  updateNote(
    @Param() { id }: FindOneParams,
    @Body() note: UpdateNoteDto,
    @Req() request: RequestWithUser,
  ) {
    return this.notesService.updateNote(id, note, request.user.id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteNote(@Param() { id }: FindOneParams) {
    return this.notesService.deleteNote(Number(id));
  }
}
