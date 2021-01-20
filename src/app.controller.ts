import { Controller, Get } from '@nestjs/common';
import MetaDto from './meta/dtos/meta.dto';
import { MetaService } from './meta/meta.service';

@Controller()
export class AppController {
  constructor(private readonly metaService: MetaService) {}

  @Get()
  getMeta(): MetaDto {
    return this.metaService.getMeta();
  }
}
