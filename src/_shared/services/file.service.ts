import {
  Injectable,
  InternalServerErrorException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mmm from 'mmmagic';
import FileInvalidException from '../exceptions/file-invalid.exception';

@Injectable()
class FileService {
  private readonly magic;

  constructor(private readonly configService: ConfigService) {
    this.magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
  }

  async checkMimeType(file) {
    let mimeType;
    try {
      mimeType = await this.getMimeType(file);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    const supportedFileTypes = this.configService
      .get('SUPPORTED_FILE_MIME_TYPES')
      .split(',');
    if (!supportedFileTypes.includes(mimeType))
      throw new UnsupportedMediaTypeException();
    if (!file) {
      throw new FileInvalidException();
    }
  }

  private getMimeType(file) {
    return new Promise((resolve, reject) => {
      this.magic.detect(file.buffer, (err, mimeType) =>
        err ? reject(err) : resolve(mimeType),
      );
    });
  }
}

export default FileService;
