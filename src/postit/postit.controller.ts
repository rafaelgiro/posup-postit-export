import {
  Controller,
  Get,
  Param,
  Response,
  StreamableFile,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { PostItService } from './postit.service';

@Controller('file')
export class FileController {
  constructor(private readonly postItService: PostItService) {}

  @Get(':id')
  async getPostItById(
    @Param('id') id: string,
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    const note = await this.postItService.getPostItById(id);

    fs.writeFileSync('temp/postit.txt', note.content);

    const file = fs.createReadStream(
      path.join(process.cwd(), 'temp/postit.txt'),
    );

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="postit.txt',
    });
    return new StreamableFile(file);
  }
}
