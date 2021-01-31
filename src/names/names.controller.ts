import { Controller, Get, Query } from '@nestjs/common';
import NameGeneratorFilter from './dtos/name-generator-filter.dto';
import { NamesService } from './names.service';

@Controller('names')
export class NamesController {
  constructor(private readonly namesService: NamesService) {}

  @Get('generate')
  getGeneratedNames(@Query() filterDto: NameGeneratorFilter): Promise<string> {
    return this.namesService.generateOne(filterDto);
  }
}
