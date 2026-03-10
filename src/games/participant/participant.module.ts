import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Participant } from '../entities/participant.entity';
import { Session } from '../entities/session.entity';
import { UserModule } from '../../auth/user/user.module';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Participant, Session]),
    UserModule, 
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}