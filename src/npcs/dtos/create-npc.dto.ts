import {
  IsBase64,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import GenderType from '../enums/gender-type.enum';

class CreateNpcDto {
  @IsBase64()
  @IsNotEmpty()
  public blob: string;

  @IsString()
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
}

export default CreateNpcDto;
