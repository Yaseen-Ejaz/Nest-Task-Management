import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { GetUsersDto } from './dto/get-users.dto';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}
  async getUsers(getUsers: GetUsersDto): Promise<User[]> {
    return this.adminRepository.getUsers(getUsers);
  }

  async deleteUser(id: string): Promise<void> {
    return this.adminRepository.deleteUser(id);
  }
}
