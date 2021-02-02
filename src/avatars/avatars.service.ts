import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as sharp from 'sharp';
import Avatar from './avatar.entity';
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

  async createAvatar(file, userId: number): Promise<Avatar> {
    const uploader = await this.usersService.findOne(String(userId));
    if (!uploader) {
      throw new UserNotFoundException(String(userId));
    }

    const resizedImageBuffer = await sharp(file.buffer)
      .resize(128, 128, { fit: 'inside', withoutEnlargement: true })
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
