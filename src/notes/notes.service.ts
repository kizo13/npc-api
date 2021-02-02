import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import Note from './note.entity';
import NoteFilterDto from './dtos/note-filter.dto';
import CreateNoteDto from './dtos/create-note.dto';
import { AuthService } from 'src/auth/auth.service';
import UpdateNoteDto from './dtos/update-note.dto';
import NoteNotFoundException from 'src/_shared/exceptions/note-not-found.exception';
import { UsersService } from 'src/users/users.service';
import UserNotFoundException from 'src/_shared/exceptions/user-not-found.exception';
import { updateBlobToBase64 } from 'src/_shared/helpers/image.helper';
import NotesPaginationDto from './dtos/notes-pagination.dto';
import PaginationOrder from 'src/_shared/enums/pagination-order.enum';
import NotesPaginatedDto from './dtos/notes-paginated.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(
    paginationDto: NotesPaginationDto,
    filterDto: NoteFilterDto,
  ): Promise<NotesPaginatedDto> {
    const noteAlias = 'note';
    const npcAlias = 'npc';
    const createdByAlias = 'createdBy';
    const modifiedByAlias = 'modifiedBy';

    const offset = (paginationDto.page - 1) * paginationDto.limit;
    paginationDto.sort = !paginationDto.sort
      ? `${noteAlias}.createdAt`
      : `${noteAlias}.${paginationDto.sort}`;
    paginationDto.order =
      paginationDto.order || PaginationOrder[PaginationOrder.DESC];

    const [noteList, totalCount] = await this.noteRepository
      .createQueryBuilder(noteAlias)
      .leftJoinAndSelect(`${noteAlias}.${npcAlias}`, npcAlias)
      .leftJoinAndSelect(`${noteAlias}.${createdByAlias}`, createdByAlias)
      .leftJoinAndSelect(`${noteAlias}.${modifiedByAlias}`, modifiedByAlias)
      .where(...NoteFilterDto.where(filterDto, npcAlias, createdByAlias))
      .orderBy(paginationDto.sort, paginationDto.order)
      .skip(offset || 0)
      .take(paginationDto.limit)
      .getManyAndCount();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: noteList.map((note) => ({
        ...note,
        npc: updateBlobToBase64(note.npc),
      })),
    };
  }

  async createNote(note: CreateNoteDto, userId: number): Promise<Note> {
    const createdBy = await this.usersService.findOne(String(userId));
    createdBy.avatar = updateBlobToBase64(createdBy.avatar);
    if (!createdBy) {
      throw new UserNotFoundException(String(userId));
    }

    const newNote = this.noteRepository.create({
      ...note,
      createdBy,
      createdAt: new Date(),
    });
    await this.noteRepository.save(newNote);
    return newNote;
  }

  async updateNote(
    id: string,
    note: UpdateNoteDto,
    userId: number,
  ): Promise<Note> {
    const modifiedBy = await this.usersService.findOne(String(userId));
    if (!modifiedBy) {
      throw new UserNotFoundException(String(userId));
    }
    await this.noteRepository.update(id, {
      ...note,
      modifiedBy,
      modifiedAt: new Date(),
    });

    const updatedNote = await this.noteRepository.findOne(id);
    if (!updatedNote) {
      throw new NoteNotFoundException(id);
    }
    updatedNote.createdBy.avatar = updateBlobToBase64(
      updatedNote.createdBy.avatar,
    );
    updatedNote.modifiedBy.avatar = updateBlobToBase64(
      updatedNote.modifiedBy.avatar,
    );
    return {
      ...updatedNote,
      npc: updateBlobToBase64(updatedNote.npc),
    };
  }

  deleteNote(id: number): Promise<DeleteResult> {
    return this.noteRepository.delete(id);
  }
}
