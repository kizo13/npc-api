import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { updateBlobToBase64 } from '@shared/helpers/image.helper';
import Note from 'src/notes/note.entity';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import PreviewNoteDto from './dto/preview-note.dto';
import HashInvalidException from '@shared/exceptions/hash-invalid.exception';

@Injectable()
export class PreviewService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private readonly configService: ConfigService,
  ) {}

  async findOne(hash: string): Promise<PreviewNoteDto> {
    if (!validate(hash)) {
      throw new HashInvalidException();
    }
    const storedNote = await this.noteRepository.findOne({
      where: { hash },
    });
    if (!storedNote) {
      throw new HashInvalidException();
    }
    storedNote.npc = updateBlobToBase64(storedNote.npc);
    const { npc, name, description } = storedNote;
    return {
      name,
      description,
      blob: npc.blob,
    } as PreviewNoteDto;
  }
}
