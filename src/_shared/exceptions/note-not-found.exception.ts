import { NotFoundException } from '@nestjs/common';

class NoteNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Note with id ${id} not found`);
  }
}

export default NoteNotFoundException;
