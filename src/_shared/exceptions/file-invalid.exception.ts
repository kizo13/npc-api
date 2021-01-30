import { BadRequestException } from '@nestjs/common';

class FileInvalidException extends BadRequestException {
  constructor() {
    super(`Invalid file`);
  }
}

export default FileInvalidException;
