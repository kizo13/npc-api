import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import FindOneParams from 'src/_shared/classes/find-one-param';
import { AuthGuard } from 'src/_shared/guards/auth.guard';
import Avatar from './avatar.entity';
import { AvatarsService } from './avatars.service';

@UseGuards(AuthGuard)
@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Get()
  getUsers(): Promise<Avatar[]> {
    return this.avatarsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createAvatar(@UploadedFile() file, @Req() req) {
    return this.avatarsService.createAvatar(file, req);
  }

  @Delete(':id')
  deleteAvatar(@Param() { id }: FindOneParams) {
    return this.avatarsService.deleteAvatar(Number(id));
  }
}
