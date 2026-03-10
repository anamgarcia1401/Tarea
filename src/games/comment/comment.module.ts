import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from '../entities/comment.entity';

import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  providers: [CommentService],
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
})
export class CommentModule {}