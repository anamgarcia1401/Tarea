import { Controller, Get, Param } from '@nestjs/common';

import { RolePermissionsService } from './role-permission.service';

@Controller('role-permissions')
export class RolePermissionController {
    constructor(private readonly rolePermissionService: RolePermissionsService) {}

    @Get()
    findAll() {
        return this.rolePermissionService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.rolePermissionService.findById(+id);
    }
}
