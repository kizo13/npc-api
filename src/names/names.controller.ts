import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/_shared/guards/jwt-auth.guard';
import NameGeneratorFilter from './dtos/name-generator-filter.dto';
import NameListGeneratorFilter from './dtos/name-list-generator-filter.dto';
import { NamesService } from './names.service';

@UseGuards(JwtAuthGuard)
@Controller('names')
export class NamesController {
  constructor(private readonly namesService: NamesService) {}

  @Get('generate-list')
  getGeneratedNames(
    @Query() filterDto: NameListGeneratorFilter,
  ): Promise<Array<string>> {
    return this.namesService.generateList(filterDto);
  }

  @Get('generate')
  getGeneratedName(@Query() filterDto: NameGeneratorFilter): Promise<string> {
    return this.namesService.generateOne(filterDto);
  }
}
