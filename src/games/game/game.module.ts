import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Game } from '../entities/game.entity';

import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  providers: [GameService],
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
})
export class GameModule {}