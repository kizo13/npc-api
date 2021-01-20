import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { DbEnums as db } from '../_shared/enums/database.enums';

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
}
