import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import FindOneParams from '@shared/classes/find-one-param';
import RequestWithUser from '@shared/dtos/request-with-user.dto';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import FileService from '@shared/services/file.service';
import Avatar from './avatar.entity';
import { AvatarsService } from './avatars.service';

@UseGuards(JwtAuthGuard)
@Controller('avatars')
export class AvatarsController {
  constructor(
    private readonly avatarsService: AvatarsService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  getUsers(): Promise<Avatar[]> {
    return this.avatarsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createAvatar(@UploadedFile() file, @Req() request: RequestWithUser) {
    await this.fileService.checkMimeType(file);
    return this.avatarsService.createAvatar(file, request.user.id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAvatar(@Param() { id }: FindOneParams) {
    return this.avatarsService.deleteAvatar(id);
  }
}
