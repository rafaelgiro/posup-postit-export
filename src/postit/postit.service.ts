import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostIt } from './postit';
import { Model } from 'mongoose';

@Injectable()
export class PostItService {
  constructor(
    @InjectModel('PostIt') private readonly postItModel: Model<PostIt>,
  ) {}

  async getPostItById(id: string) {
    return await this.postItModel.findById(id).exec();
  }
}
