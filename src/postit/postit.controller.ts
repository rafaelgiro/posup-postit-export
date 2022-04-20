/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Response,
  StreamableFile,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PostIt } from './postit';

import { PostItService } from './postit.service';

@Controller('file')
export class FileController {
  constructor(private readonly postItService: PostItService) {}

  @Get()
  async getAllPostIt(): Promise<PostIt[]> {
    return this.postItService.getAllPostIt();
  }

  @Get(':id')
  async getPostItById(
    @Param('id') id: string,
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    const note = await this.postItService.getPostItById(id);
    const fileTxt = path.join(process.cwd(), 'postit.txt');

    fs.writeFileSync(fileTxt, note.content);

    const file = fs.createReadStream(fileTxt);

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="postit.txt',
    });
    return new StreamableFile(file);
  }
}
