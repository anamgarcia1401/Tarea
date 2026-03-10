import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from '../entities/role.entity';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
