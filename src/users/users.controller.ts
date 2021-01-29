import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import FindOneParams from 'src/_shared/classes/find-one-param';
import { AuthGuard } from 'src/_shared/guards/auth.guard';
import UpdateUserDto from './dtos/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<Omit<User, 'password'>[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param() { id }: FindOneParams): Promise<Omit<User, 'password'>> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Param() { id }: FindOneParams,
    @Body() body: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.updateUser(id, body);
  }
}
