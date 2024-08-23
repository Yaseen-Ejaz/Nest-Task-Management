import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}
  async getUsers(): Promise<User[]> {
    return this.adminRepository.getUsers();
  }

  async deleteUser(id: string): Promise<void> {
    return this.adminRepository.deleteUser(id);
  }
}
