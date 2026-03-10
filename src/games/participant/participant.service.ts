import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Participant } from '../entities/participant.entity';
import { Session } from '../entities/session.entity';
import { UserService } from '../../auth/user/user.service';

import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,

        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        private readonly usersService: UserService,
    ) {}

    async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
        const session = await this.sessionRepository.findOne({
            where: { id: createParticipantDto.sessionId },
        });

        if (!session) {
            throw new NotFoundException('Session not found');
        }

        const user = await this.usersService.findById(createParticipantDto.userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const participant = this.participantRepository.create({
            session,
            user,
            score: createParticipantDto.score,
            position: createParticipantDto.position,
            isWinner: createParticipantDto.isWinner,
        });

        return this.participantRepository.save(participant);
    }

    async findAll(): Promise<Participant[]> {
        return this.participantRepository.find({
            relations: ['user', 'session'],
        });
    }

    async findOne(id: number): Promise<Participant> {
        const participant = await this.participantRepository.findOne({
            where: { id },
            relations: ['user', 'session'],
        });

        if (!participant) {
            throw new NotFoundException('Participant not found');
        }

        return participant;
    }

    async remove(id: number): Promise<void> {
        const participant = await this.findOne(id);
        await this.participantRepository.remove(participant);
    }
}