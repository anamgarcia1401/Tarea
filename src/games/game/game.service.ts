import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Game } from '../entities/game.entity';

import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  findAll() {
    return this.gameRepository.find();
  }

  findById(id: number) {
    return this.gameRepository.findOneBy({ id });
  }

  create(createGameDto: CreateGameDto) {
    const newGame = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(newGame);
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    await this.gameRepository.update(id, updateGameDto);
    return this.gameRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const result = await this.gameRepository.delete(id);
    if (result.affected) {
      return { id };
    }
    return null;
  }
}