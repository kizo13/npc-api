import { IsString } from 'class-validator';

class NameGeneratorFilter {
  @IsString()
  public gender: string;

  @IsString()
  public culture: string;
}

export default NameGeneratorFilter;
