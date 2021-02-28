import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AgeEnums } from 'src/_shared/enums/age.enums';
import { CultureEnums } from 'src/_shared/enums/culture.enums';
import { RaceEnums } from 'src/_shared/enums/race.enums';
import GenderType from '../enums/gender-type.enum';

class NpcFilterDto {
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
  @IsEnum(AgeEnums, {
    message: `type must be a valid enum value: '${AgeEnums[AgeEnums.cat1]}', '${
      AgeEnums[AgeEnums.cat2]
    }', '${AgeEnums[AgeEnums.cat3]}', '${AgeEnums[AgeEnums.cat4]}', '${
      AgeEnums[AgeEnums.cat5]
    }', '${AgeEnums[AgeEnums.cat6]}'`,
  })
  public age: AgeEnums;

  @IsString()
  @IsOptional()
  @IsEnum(RaceEnums, {
    message: `type must be a valid enum value: '${
      RaceEnums[RaceEnums.AMUND]
    }', '${RaceEnums[RaceEnums.DZSENN]}', '${RaceEnums[RaceEnums.ELF]}', '${
      RaceEnums[RaceEnums.EMBER]
    }', '${RaceEnums[RaceEnums.FELELF]}', '${RaceEnums[RaceEnums.GNOM]}', '${
      RaceEnums[RaceEnums.GOBLIN]
    }', '${RaceEnums[RaceEnums.KHAL]}', '${RaceEnums[RaceEnums.TORPE]}', '${
      RaceEnums[RaceEnums.UDVARI_ORK]
    }', '${RaceEnums[RaceEnums.VADORK]}', '${RaceEnums[RaceEnums.WIER]}'`,
  })
  public race: RaceEnums;

  @IsString()
  @IsOptional()
  @IsEnum(CultureEnums, {
    message: `type must be a valid enum value: '${
      CultureEnums[CultureEnums.aszisz]
    }', '${CultureEnums[CultureEnums.crantai]}', '${
      CultureEnums[CultureEnums.dwoon]
    }', '${CultureEnums[CultureEnums.dzsad]}', '${
      CultureEnums[CultureEnums.elf]
    }', '${CultureEnums[CultureEnums.enoszukei]}', '${
      CultureEnums[CultureEnums.erv]
    }', '${CultureEnums[CultureEnums.goblin]}', '${
      CultureEnums[CultureEnums.gorviki]
    }', '${CultureEnums[CultureEnums.ilanori]}', '${
      CultureEnums[CultureEnums.korg]
    }', '${CultureEnums[CultureEnums.krani]}', '${
      CultureEnums[CultureEnums.kyr_toroni]
    }', '${CultureEnums[CultureEnums.nomad]}', '${
      CultureEnums[CultureEnums.ork]
    }', '${CultureEnums[CultureEnums.pyarroni]}', '${
      CultureEnums[CultureEnums.shadoni]
    }', '${CultureEnums[CultureEnums.torpe]}'`,
  })
  public culture: CultureEnums;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public uploaderId: number;

  static where(
    filterDto: NpcFilterDto,
    npcAlias: string,
  ): [string, Record<string, unknown>] {
    const whereStrParts = [];
    const whereParams: Record<string, unknown> = {};

    if (filterDto?.gender) {
      whereStrParts.push(`${npcAlias}.gender = :gender`);
      whereParams.gender = filterDto.gender;
    }

    if (filterDto?.class) {
      whereStrParts.push(`:class = ANY (${npcAlias}.class)`);
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

    if (filterDto?.uploaderId) {
      whereStrParts.push(`${npcAlias}."uploaderId" = :uploaderId`);
      whereParams.uploaderId = filterDto.uploaderId;
    }

    return [whereStrParts.join(' AND '), whereParams];
  }
}

export default NpcFilterDto;
