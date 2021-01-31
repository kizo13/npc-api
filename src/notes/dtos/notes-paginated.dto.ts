import PaginatedDto from 'src/_shared/dtos/paginated.dto';
import Note from '../note.entity';

class NotesPaginatedDto extends PaginatedDto {
  data: Note[];
}

export default NotesPaginatedDto;
