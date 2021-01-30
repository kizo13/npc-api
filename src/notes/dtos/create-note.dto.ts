import { IsObject, IsOptional, IsString } from 'class-validator';
import Npc from 'src/npcs/npc.entity';

class CreateNoteDto {
  @IsObject()
  public npc: Npc;

  @IsString()
  @IsOptional()
  public description: string;

  @IsString()
  @IsOptional()
  public name: string;
}

export default CreateNoteDto;
