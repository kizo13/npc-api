import { IsIn, IsOptional, IsString } from 'class-validator';
import PaginationDto from '@shared/dtos/pagination.dto';
import { DbEnums as db } from '@shared/enums/database.enums';

class NotesPaginationDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @IsIn([
    db.NOTE_COLUMN_ID,
    db.NOTE_COLUMN_NAME,
    db.NOTE_COLUMN_CREATED_AT,
    db.NOTE_COLUMN_CREATED_BY_ID,
  ])
  sort?: string;
}

export default NotesPaginationDto;
