import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as sharp from 'sharp';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import NpcNotFoundException from 'src/_shared/exceptions/npc-not-found.exception';
import { DeleteResult, Repository } from 'typeorm';
import CreateNpcDto from './dtos/create-npc.dto';
import NpcFilterDto from './dtos/npc-filter.dto';
import UpdateNpcDto from './dtos/update-npc.dto';
import Npc from './npc.entity';
import { updateBlobToBase64 } from 'src/_shared/helpers/image.helper';
import NpcsPaginationDto from './dtos/npcs-pagination.dto';
import NpcsPaginatedDto from './dtos/npcs-paginated.dto';
import PaginationOrder from 'src/_shared/enums/pagination-order.enum';

@Injectable()
export class NpcsService {
  constructor(
    @InjectRepository(Npc)
    private npcRepository: Repository<Npc>,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(
    paginationDto: NpcsPaginationDto,
    filterDto: NpcFilterDto,
  ): Promise<NpcsPaginatedDto> {
    const npcAlias = 'npc';
    const uploaderAlias = 'uploader';

    const offset = (paginationDto.page - 1) * paginationDto.limit;
    paginationDto.sort = !paginationDto.sort
      ? `${npcAlias}.createdAt`
      : `${npcAlias}.${paginationDto.sort}`;
    paginationDto.order =
      paginationDto.order || PaginationOrder[PaginationOrder.DESC];

    const [npcList, totalCount] = await this.npcRepository
      .createQueryBuilder(npcAlias)
      .leftJoinAndSelect(`${npcAlias}.${uploaderAlias}`, uploaderAlias)
      .where(...NpcFilterDto.where(filterDto, npcAlias))
      .orderBy(paginationDto.sort, paginationDto.order)
      .skip(offset || 0)
      .take(paginationDto.limit)
      .getManyAndCount();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: npcList.map((npc) => updateBlobToBase64(npc)),
    };
  }

  async createNpc(file, npc: CreateNpcDto, userId: number): Promise<Npc> {
    const storedUser = await this.usersService.findOne(String(userId));
    if (!storedUser) throw new ForbiddenException();

    const resizedImageBuffer = await sharp(file.buffer)
      .resize(450, 450, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();
    const blob = resizedImageBuffer.toString('base64');
    const newNpc = this.npcRepository.create({
      ...npc,
      blob,
      uploader: storedUser,
      createdAt: new Date(),
    });
    await this.npcRepository.save(newNpc);
    return newNpc;
  }

  async updateNpc(id: string, npc: UpdateNpcDto): Promise<Npc> {
    await this.npcRepository.update(id, { ...npc, modifiedAt: new Date() });

    const npcAlias = 'npc';
    const uploaderAlias = 'uploader';
    const avatarAlias = 'avatar';
    const updatedNpc = await this.npcRepository
      .createQueryBuilder(npcAlias)
      .leftJoinAndSelect(`${npcAlias}.${uploaderAlias}`, uploaderAlias)
      .leftJoinAndSelect(`${uploaderAlias}.${avatarAlias}`, avatarAlias)
      .where(`${npcAlias}.id = :id`, { id })
      .getOne();
    updatedNpc.uploader.avatar = updateBlobToBase64(updatedNpc.uploader.avatar);

    if (!updatedNpc) {
      throw new NpcNotFoundException(id);
    }
    return updateBlobToBase64(updatedNpc);
  }

  async deleteNpc(id: string): Promise<DeleteResult> {
    const result = await this.npcRepository.delete(id);
    if (result.affected === 0) {
      throw new NpcNotFoundException(id);
    }
    return;
  }

  async getClasses(): Promise<string[]> {
    const npcAlias = 'npc';
    const npcList = await this.npcRepository
      .createQueryBuilder(npcAlias)
      .select([`${npcAlias}.class`])
      .where(`${npcAlias}.class IS NOT NULL`)
      .getMany();
    return npcList
      .reduce((acc, npc) => [...acc, ...npc.class], [])
      .filter((npc, i, arr) => arr.indexOf(npc) === i);
  }
}
