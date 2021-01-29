import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from './user.entity';
import UpdateUserDto from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const allUsers = await this.usersRepository.find();
    return allUsers.map((user) => {
      const { password: _password, ...rest } = user;
      return rest;
    });
  }

  findOneByEmail(email: string, isActive = true): Promise<User> {
    const userAlias = 'user';
    return this.usersRepository
      .createQueryBuilder(userAlias)
      .leftJoinAndSelect(`${userAlias}.avatar`, 'avatar')
      .where(
        `"${userAlias}".email = :email AND "${userAlias}"."isActive" = :isActive`,
        { email, isActive },
      )
      .getOne();
  }

  async findOne(id: string, isActive = true): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne(id, {
      where: { isActive },
    });
    const { password: _password, ...rest } = user;
    return rest;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateUser(
    id: string,
    user: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
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
