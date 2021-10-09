import { BadRequestException } from '@nestjs/common';

class HashInvalidException extends BadRequestException {
  constructor() {
    super(`Invalid hash`);
  }
}

export default HashInvalidException;
