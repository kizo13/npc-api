import { Controller, Get, Param } from '@nestjs/common';
import FindOneByHashParams from '@shared/classes/find-one-by-hash-params';
import PreviewNoteDto from './dto/preview-note.dto';
import { PreviewService } from './preview.service';

@Controller('preview')
export class PreviewController {
  constructor(private readonly previewService: PreviewService) {}

  @Get(':hash')
  getUserByHash(
    @Param() { hash }: FindOneByHashParams,
  ): Promise<PreviewNoteDto> {
    return this.previewService.findOne(hash);
  }
}
