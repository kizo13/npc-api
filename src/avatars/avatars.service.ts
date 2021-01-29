import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Request } from 'express';
import * as sharp from 'sharp';
import Avatar from './avatar.entity';
import SessionTokenDataDto from 'src/auth/dtos/session-token-data.dto';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectRepository(Avatar)
    private avatarRepository: Repository<Avatar>,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  findAll(): Promise<Avatar[]> {
    return this.avatarRepository.find();
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
      throw new NotFoundException(`User with id ${userData.id} not found`);
    }

    const resizedImageBuffer = await sharp(file.buffer)
      .resize(450, 450, { fit: 'inside' })
      .toBuffer();
    const blob = resizedImageBuffer.toString('base64');
    const newAvatar = this.avatarRepository.create({
      blob,
      uploader,
    });
    await this.avatarRepository.save(newAvatar);
    return newAvatar;
  }

  deleteAvatar(id: number): Promise<DeleteResult> {
    return this.avatarRepository.delete(id);
  }
}
