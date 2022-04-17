import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileController } from './postit.controller';
import { PostItService } from './postit.service';
import { PostItSchema } from './schemas/postit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PostIt', schema: PostItSchema }]),
  ],
  controllers: [FileController],
  providers: [PostItService],
})
export class PostItModule {}
