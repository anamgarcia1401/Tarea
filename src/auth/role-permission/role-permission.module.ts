import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermission } from '../entities/role-permission.entity';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionsService } from './role-permission.service';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
    imports: [TypeOrmModule.forFeature([RolePermission]), RoleModule, PermissionModule],
    controllers: [RolePermissionController],
    providers: [RolePermissionsService],
})
export class RolePermissionModule {}
