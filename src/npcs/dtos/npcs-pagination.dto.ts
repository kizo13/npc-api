import { IsIn, IsOptional, IsString } from 'class-validator';
import PaginationDto from 'src/_shared/dtos/pagination.dto';
import { DbEnums as db } from 'src/_shared/enums/database.enums';

class NpcsPaginationDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @IsIn([
    db.NPC_COLUMN_ID,
    db.NPC_COLUMN_GENDER,
    db.NPC_COLUMN_CLASS,
    db.NPC_COLUMN_AGE,
    db.NPC_COLUMN_RACE,
    db.NPC_COLUMN_CULTURE,
    db.NPC_COLUMN_CREATED_AT,
    db.NPC_COLUMN_UPLOADER_ID,
  ])
  sort?: string;
}

export default NpcsPaginationDto;
