import { Injectable } from '@nestjs/common';
import { name, version } from '../../package.json';
import MetaDto from './dtos/meta.dto';

@Injectable()
export class MetaService {
  getMeta(): MetaDto {
    return {
      app: name,
      version: version,
    };
  }
}
