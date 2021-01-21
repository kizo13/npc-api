import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from './entities/user.entity';
import { DbEnums as db } from '../_shared/enums/database.enums';
import UpdateUserDto from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        db.USER_COLUMN_ID,
        db.USER_COLUMN_USERNAME,
        db.USER_COLUMN_EMAIL,
        db.USER_COLUMN_AVATAR_ID,
        db.USER_COLUMN_ISACTIVE,
      ],
    });
  }

  findOneByEmail(email: string, isActive = true): Promise<User> {
    const userAlias = 'user';
    return this.usersRepository
      .createQueryBuilder(userAlias)
      .where(
        `${userAlias}.email = :email AND ${userAlias}.is_active = :isActive`,
        { email, isActive },
      )
      .getOne();
  }

  findOne(id: string, isActive = true): Promise<User> {
    return this.usersRepository.findOne(id, {
      select: [
        db.USER_COLUMN_ID,
        db.USER_COLUMN_USERNAME,
        db.USER_COLUMN_EMAIL,
        db.USER_COLUMN_AVATAR_ID,
        db.USER_COLUMN_ISACTIVE,
      ],
      where: { is_active: isActive },
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    if (user.password !== undefined) {
      user.password = await argon2.hash(user.password);
    }

    await this.usersRepository.update(id, { ...user });

    const updatedUser = await this.findOne(id);
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }
}
