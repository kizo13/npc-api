import { IsString } from 'class-validator';

class UpdateNoteDto {
  @IsString()
  public description: string;
}

export default UpdateNoteDto;
