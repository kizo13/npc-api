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
} from '@nestjs/common';
import FindOneParams from 'src/_shared/classes/find-one-param';
import { AuthGuard } from 'src/_shared/guards/auth.guard';
import CreateNoteDto from './dtos/create-note.dto';
import NoteFilterDto from './dtos/note-filter.dto';
import UpdateNoteDto from './dtos/update-note.dto';
import Note from './note.entity';
import { NotesService } from './notes.service';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAll(@Query() filterDto: NoteFilterDto): Promise<Note[]> {
    return this.notesService.findAll(filterDto);
  }

  @Post()
  async createNpc(@Body() npc: CreateNoteDto, @Req() req) {
    return this.notesService.createNote(npc, req);
  }

  @Put(':id')
  updateNpc(
    @Param() { id }: FindOneParams,
    @Body() note: UpdateNoteDto,
    @Req() req,
  ) {
    return this.notesService.updateNote(id, note, req);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteNote(@Param() { id }: FindOneParams) {
    return this.notesService.deleteNote(Number(id));
  }
}
