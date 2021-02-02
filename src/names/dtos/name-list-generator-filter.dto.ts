import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import NameGeneratorFilter from './name-generator-filter.dto';

class NameListGeneratorFilter extends NameGeneratorFilter {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public count: number;
}

export default NameListGeneratorFilter;
