import { NotFoundException } from '@nestjs/common';

class AvatarNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Avatar with id ${id} not found`);
  }
}

export default AvatarNotFoundException;
