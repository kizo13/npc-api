import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Buffer } from 'buffer';
import { Request } from 'express';
import * as sharp from 'sharp';
import { AuthService } from 'src/auth/auth.service';
import SessionTokenDataDto from 'src/auth/dtos/session-token-data.dto';
import { UsersService } from 'src/users/users.service';
import NpcNotFoundException from 'src/_shared/exceptions/npc-not-found.exception';
import { DeleteResult, Repository } from 'typeorm';
import CreateNpcDto from './dtos/create-npc.dto';
import NpcFilterDto from './dtos/npc-filter.dto';
import UpdateNpcDto from './dtos/update-npc.dto';
import Npc from './npc.entity';

@Injectable()
export class NpcsService {
  constructor(
    @InjectRepository(Npc)
    private npcRepository: Repository<Npc>,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(filterDto: NpcFilterDto): Promise<Npc[]> {
    const npcAlias = 'npc';
    const uploaderAlias = 'uploader';
    const npcList = await this.npcRepository
      .createQueryBuilder(npcAlias)
      .leftJoinAndSelect(`${npcAlias}.${uploaderAlias}`, uploaderAlias)
      .where(...NpcFilterDto.where(filterDto, npcAlias))
      .getMany();
    return npcList.map((npc) => ({
      ...npc,
      blob: Buffer.from(npc.blob, 'base64').toString('ascii'),
    }));
  }

  async createNpc(file, npc: CreateNpcDto, req: Request): Promise<Npc> {
    const authSessionCookie = req.cookies && req.cookies['AuthSession'];
    if (!authSessionCookie) throw new UnauthorizedException();

    let userData: SessionTokenDataDto;
    try {
      userData = this.authService.decodeToken(authSessionCookie);
    } catch (error) {
      throw new UnauthorizedException();
    }

    const storedUser = await this.usersService.findOne(String(userData.id));
    if (!storedUser) throw new UnauthorizedException();

    const resizedImageBuffer = await sharp(file.buffer)
      .resize(450, 450, { fit: 'inside' })
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
    if (updatedNpc.uploader.avatar) {
      updatedNpc.uploader.avatar = {
        ...updatedNpc.uploader.avatar,
        blob: Buffer.from(updatedNpc.uploader.avatar.blob, 'base64').toString(
          'ascii',
        ),
      };
    }

    if (!updatedNpc) {
      throw new NpcNotFoundException(id);
    }
    return {
      ...updatedNpc,
      blob: Buffer.from(updatedNpc.blob, 'base64').toString('ascii'),
    };
  }

  async deleteNpc(id: string): Promise<DeleteResult> {
    const result = await this.npcRepository.delete(id);
    if (result.affected === 0) {
      throw new NpcNotFoundException(id);
    }
    return;
  }

  async getClasses(filterQuery: string): Promise<string[]> {
    const filter = filterQuery || '';
    const npcAlias = 'npc';
    const npcList = await this.npcRepository
      .createQueryBuilder(npcAlias)
      .select([`${npcAlias}.class`])
      .distinctOn([`${npcAlias}.class`])
      .where(`${npcAlias}.class like :class`, { class: `%${filter}%` })
      .getMany();
    return npcList.map((npc) => npc.class);
  }
}
