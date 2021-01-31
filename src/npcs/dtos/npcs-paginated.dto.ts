import PaginatedDto from 'src/_shared/dtos/paginated.dto';
import Npc from '../npc.entity';

class NpcsPaginatedDto extends PaginatedDto {
  data: Npc[];
}

export default NpcsPaginatedDto;
