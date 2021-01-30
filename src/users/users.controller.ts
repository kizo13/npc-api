import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import FindOneParams from 'src/_shared/classes/find-one-param';
import { AdminOnly } from 'src/_shared/decorators/admin-only.decorator';
import { AuthGuard } from 'src/_shared/guards/auth.guard';
import UpdateUserDto from './dtos/update-user.dto';
import { User } from './user.entity';
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

  @Put(':id')
  updateUser(
    @Param() { id }: FindOneParams,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  @AdminOnly()
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
