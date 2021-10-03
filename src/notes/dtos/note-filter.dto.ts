import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import GenderType from 'src/npcs/enums/gender-type.enum';

class NoteFilterDto {
  @IsString()
  @IsOptional()
  public description: string;

  @IsString()
  @IsOptional()
  @IsEnum(GenderType, {
    message: `type must be a valid enum value: '${
      GenderType[GenderType.MALE]
    }', '${GenderType[GenderType.FEMALE]}'`,
  })
  public gender: GenderType;

  @IsString()
  @IsOptional()
  public class: string;

  @IsString()
  @IsOptional()
  public age: string;

  @IsString()
  @IsOptional()
  public race: string;

  @IsString()
  @IsOptional()
  public culture: string;

  @IsString()
  @IsOptional()
  public name: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public createdById: number;

  static where(
    filterDto: NoteFilterDto,
    noteAlias: string,
    npcAlias: string,
  ): [string, Record<string, unknown>] {
    const whereStrParts = [];
    const whereParams: Record<string, unknown> = {};

    if (filterDto?.description) {
      whereStrParts.push(`${noteAlias}.description = :description`);
      whereParams.description = filterDto.description;
    }

    if (filterDto?.gender) {
      whereStrParts.push(`${npcAlias}.gender = :gender`);
      whereParams.gender = filterDto.gender;
    }

    if (filterDto?.class) {
      whereStrParts.push(`${npcAlias}.class = :class`);
      whereParams.class = filterDto.class;
    }

    if (filterDto?.age) {
      whereStrParts.push(`${npcAlias}.age = :age`);
      whereParams.age = filterDto.age;
    }

    if (filterDto?.race) {
      whereStrParts.push(`${npcAlias}.race = :race`);
      whereParams.race = filterDto.race;
    }

    if (filterDto?.culture) {
      whereStrParts.push(`${npcAlias}.culture = :culture`);
      whereParams.culture = filterDto.culture;
    }

    if (filterDto?.name) {
      whereStrParts.push(`${noteAlias}.name ILIKE :name`);
      whereParams.name = `%${filterDto.name}%`;
    }

    if (filterDto?.createdById) {
      whereStrParts.push(`"${noteAlias}"."createdById" = :createdById`);
      whereParams.createdById = filterDto.createdById;
    }

    return [whereStrParts.join(' AND '), whereParams];
  }
}

export default NoteFilterDto;
