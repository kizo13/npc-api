import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from './user.entity';
import UpdateUserDto from './dtos/update-user.dto';
import UserNotFoundException from 'src/_shared/exceptions/user-not-found.exception';
import { updateBlobToBase64 } from 'src/_shared/helpers/image.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const usersList = await this.usersRepository.find();
    return usersList.map((user) => {
      user.avatar = updateBlobToBase64(user.avatar);
      return user;
    });
  }

  findOneByEmail(email: string, isActive = true): Promise<User> {
    const userAlias = 'user';
    return this.usersRepository
      .createQueryBuilder(userAlias)
      .leftJoinAndSelect(`${userAlias}.avatar`, 'avatar')
      .addSelect(`${userAlias}.password`)
      .where(
        `"${userAlias}".email = :email AND "${userAlias}"."isActive" = :isActive`,
        { email, isActive },
      )
      .getOne();
  }

  async findOne(id: string, isActive = true): Promise<User> {
    const storedUser = await this.usersRepository.findOne(id, {
      where: { isActive },
    });
    storedUser.avatar = updateBlobToBase64(storedUser.avatar);
    return storedUser;
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    if (user.password !== undefined) {
      user.password = await argon2.hash(user.password);
    }

    await this.usersRepository.update(id, { ...user });

    const userAlias = 'npc';
    const avatarAlias = 'avatar';
    const updatedUser = await this.usersRepository
      .createQueryBuilder(userAlias)
      .leftJoinAndSelect(`${userAlias}.${avatarAlias}`, avatarAlias)
      .where(`${userAlias}.id = :id`, { id })
      .getOne();

    if (!updatedUser) {
      throw new UserNotFoundException(id);
    }
    updatedUser.avatar = updateBlobToBase64(updatedUser.avatar);
    return updatedUser;
  }

  async deleteUser(id: string) {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new UserNotFoundException(id);
    }

    return;
  }
}
