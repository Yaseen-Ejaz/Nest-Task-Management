import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository, DataSource } from 'typeorm';
import { GetUsersDto } from './dto/get-users.dto';
import { ActivityLog } from 'src/activitylog/activity-log.entity';

@Injectable()
export class AdminRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUsers(): Promise<User[]> {
    return this.find();
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID: '${id}' not found`);
    }
  }
}
