import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll() {
    return this.roleRepository.find();
  }

  findById(id: number) {
    return this.roleRepository.findOneBy({ id });
  }

  findByName(name: string) {
    return this.roleRepository.findOneBy({ name });
  }

  create(createRoleDto: CreateRoleDto) {
    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(id, updateRoleDto);
    return this.roleRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const result = await this.roleRepository.delete(id);
    if (result.affected) {
      return { id };
    }
    return null;
  }
}