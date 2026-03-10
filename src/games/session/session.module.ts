import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Session } from '../entities/session.entity';

import { SessionService } from './session.service';
import { SessionController } from './session.controller';

@Module({
  providers: [SessionService],
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [SessionController],
})
export class SessionModule {}