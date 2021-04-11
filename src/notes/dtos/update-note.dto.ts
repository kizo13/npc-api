import { IsBoolean, IsString } from 'class-validator';

class UpdateNoteDto {
  @IsString()
  public description: string;

  @IsBoolean()
  public isPrivate: boolean;
}

export default UpdateNoteDto;
