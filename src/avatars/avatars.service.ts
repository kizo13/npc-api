import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Request } from 'express';
import * as sharp from 'sharp';
import Avatar from './avatar.entity';
import SessionTokenDataDto from 'src/auth/dtos/session-token-data.dto';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import UserNotFoundException from 'src/_shared/exceptions/user-not-found.exception';
import AvatarNotFoundException from 'src/_shared/exceptions/avatar-not-found.exception';
import { updateBlobToBase64 } from 'src/_shared/helpers/image.helper';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectRepository(Avatar)
    private avatarRepository: Repository<Avatar>,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Avatar[]> {
    const avatarAlias = 'avatar';
    const uploaderAlias = 'uploader';
    const avatarList = await this.avatarRepository
      .createQueryBuilder(avatarAlias)
      .leftJoinAndSelect(`${avatarAlias}.${uploaderAlias}`, uploaderAlias)
      .getMany();

    return avatarList.map((avatar) => updateBlobToBase64(avatar));
  }

  async createAvatar(file, req: Request): Promise<Avatar> {
    const authSessionCookie = req.cookies && req.cookies['AuthSession'];
    if (!authSessionCookie) throw new UnauthorizedException();

    let userData: SessionTokenDataDto;
    try {
      userData = this.authService.decodeToken(authSessionCookie);
    } catch (error) {
      throw new UnauthorizedException();
    }

    const uploader = await this.usersService.findOne(String(userData.id));
    if (!uploader) {
      throw new UserNotFoundException(String(userData.id));
    }

    const resizedImageBuffer = await sharp(file.buffer)
      .resize(250, 250, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();
    const blob = resizedImageBuffer.toString('base64');
    const newAvatar = this.avatarRepository.create({
      blob,
      createdAt: new Date(),
      uploader,
    });
    await this.avatarRepository.save(newAvatar);
    return newAvatar;
  }

  async deleteAvatar(id: string): Promise<DeleteResult> {
    const result = await this.avatarRepository.delete(id);
    if (result.affected === 0) {
      throw new AvatarNotFoundException(id);
    }

    return;
  }
}
