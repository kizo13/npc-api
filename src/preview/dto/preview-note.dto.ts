import { IsString } from 'class-validator';

class PreviewNoteDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public blob: string;
}

export default PreviewNoteDto;
