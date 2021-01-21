import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import FindOneParams from 'src/_shared/classes/find-one-param';
import { AuthGuard } from 'src/_shared/guards/auth.guard';
import UpdateUserPasswordDto from './dtos/update-user-password.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param() { id }: FindOneParams): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id/change-password')
  updateUserPassword(
    @Param() { id }: FindOneParams,
    @Body() body: UpdateUserPasswordDto,
  ): Promise<User> {
    return this.usersService.updateUserPassword(id, body.password);
  }
}
