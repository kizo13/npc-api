import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/_shared/guards/auth.guard';
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
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
