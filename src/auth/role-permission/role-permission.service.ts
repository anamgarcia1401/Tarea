import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RolePermission } from '../entities/role-permission.entity';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';

import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';

@Injectable()
export class RolePermissionsService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>,
        private readonly rolesService: RoleService,
        private readonly permissionsService: PermissionService,
    ) {}

    findAll() {
        return this.rolePermissionRepository.find({
            relations: ['role', 'permission'],
        });
    }

    findById(id: number) {
        return this.rolePermissionRepository.findOne({
            where: { id },
            relations: ['role', 'permission'],
        });
    }

    async create(createRolePermissionDto: CreateRolePermissionDto) {
        const role = await this.rolesService.findById(createRolePermissionDto.roleId);
        const permission = await this.permissionsService.findById(createRolePermissionDto.permissionId);

        if (!role || !permission) {
            throw new Error('Role or Permission not found');
        }

        const newRolePermission = this.rolePermissionRepository.create({
            role,
            permission,
        });

        return this.rolePermissionRepository.save(newRolePermission);
    }

    async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
        const updateData: Partial<RolePermission> = {};

        if (updateRolePermissionDto.roleId) {
            const role = await this.rolesService.findById(updateRolePermissionDto.roleId);

            if (!role) {
                throw new Error('Role not found');
            }

            updateData.role = role;
        }

        if (updateRolePermissionDto.permissionId) {
            const permission = await this.permissionsService.findById(updateRolePermissionDto.permissionId);

            if (!permission) {
                throw new Error('Permission not found');
            }

            updateData.permission = permission;
        }

        await this.rolePermissionRepository.update(id, updateData);

        return this.findById(id);
    }

    async remove(id: number) {
        const result = await this.rolePermissionRepository.delete(id);

        if (result.affected) {
            return { id };
        }

        return null;
    }
}