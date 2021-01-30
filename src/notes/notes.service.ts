import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Request } from 'express';
import Note from './note.entity';
import NoteFilterDto from './dtos/note-filter.dto';
import CreateNoteDto from './dtos/create-note.dto';
import SessionTokenDataDto from 'src/auth/dtos/session-token-data.dto';
import { AuthService } from 'src/auth/auth.service';
import UpdateNoteDto from './dtos/update-note.dto';
import NoteNotFoundException from 'src/_shared/exceptions/note-not-found.exception';
import { UsersService } from 'src/users/users.service';
import UserNotFoundException from 'src/_shared/exceptions/user-not-found.exception';
import { updateBlobToBase64 } from 'src/_shared/helpers/image.helper';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(filterDto: NoteFilterDto): Promise<Note[]> {
    const noteAlias = 'note';
    const npcAlias = 'npc';
    const createdByAlias = 'createdBy';
    const modifiedByAlias = 'modifiedBy';
    const noteList = await this.noteRepository
      .createQueryBuilder(noteAlias)
      .leftJoinAndSelect(`${noteAlias}.${npcAlias}`, npcAlias)
      .leftJoinAndSelect(`${noteAlias}.${createdByAlias}`, createdByAlias)
      .leftJoinAndSelect(`${noteAlias}.${modifiedByAlias}`, modifiedByAlias)
      .where(...NoteFilterDto.where(filterDto, npcAlias, createdByAlias))
      .getMany();

    return noteList.map((note) => {
      return {
        ...note,
        npc: updateBlobToBase64(note.npc),
      };
    });
  }

  async createNote(note: CreateNoteDto, req: Request): Promise<Note> {
    const authSessionCookie = req.cookies && req.cookies['AuthSession'];
    if (!authSessionCookie) throw new UnauthorizedException();

    let userData: SessionTokenDataDto;
    try {
      userData = this.authService.decodeToken(authSessionCookie);
    } catch (error) {
      throw new UnauthorizedException();
    }

    const createdBy = await this.usersService.findOne(String(userData.id));
    createdBy.avatar = updateBlobToBase64(createdBy.avatar);
    if (!createdBy) {
      throw new UserNotFoundException(String(userData.id));
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
    req: Request,
  ): Promise<Note> {
    const authSessionCookie = req.cookies && req.cookies['AuthSession'];
    if (!authSessionCookie) throw new UnauthorizedException();

    let userData: SessionTokenDataDto;
    try {
      userData = this.authService.decodeToken(authSessionCookie);
    } catch (error) {
      throw new UnauthorizedException();
    }
    const modifiedBy = await this.usersService.findOne(String(userData.id));
    if (!modifiedBy) {
      throw new UserNotFoundException(String(userData.id));
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
