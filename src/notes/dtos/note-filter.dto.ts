import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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
  public uploaderId: number;

  @IsBoolean()
  @IsOptional()
  public isPrivate: boolean;

  static where(
    filterDto: NoteFilterDto,
    npcAlias: string,
    createdByAlias: string,
  ): [string, Record<string, unknown>] {
    const whereStrParts = [];
    const whereParams: Record<string, unknown> = {};

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
      whereStrParts.push(`${npcAlias}.name ILIKE :name`);
      whereParams.name = `%${filterDto.name}%`;
    }

    if (filterDto?.uploaderId) {
      whereStrParts.push(`"${createdByAlias}"."id" = :uploaderId`);
      whereParams.uploaderId = filterDto.uploaderId;
    }

    if (filterDto?.isPrivate) {
      whereStrParts.push(`"${createdByAlias}"."isPrivate" = :isPrivate`);
      whereParams.isPrivate = filterDto.isPrivate;
    }

    return [whereStrParts.join(' AND '), whereParams];
  }
}

export default NoteFilterDto;
