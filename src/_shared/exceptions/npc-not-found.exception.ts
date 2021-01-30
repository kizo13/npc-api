import { NotFoundException } from '@nestjs/common';

class NpcNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`NPC with id ${id} not found`);
  }
}

export default NpcNotFoundException;
