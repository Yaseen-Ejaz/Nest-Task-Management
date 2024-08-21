import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository, DataSource } from 'typeorm';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class AdminRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUsers(getUsersDto: GetUsersDto): Promise<User[]> {
    const { username, email } = getUsersDto;

    try {
      const queryBuilder = this.createQueryBuilder();
      queryBuilder.where('username LIKE :username OR email LIKE :email', {
        username,
        email,
      });

      const users = await queryBuilder.getMany();
      return users;
    } catch (error) {
      // Handle errors appropriately
      throw new Error('Failed to retrieve users: ' + error.message);
    }
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID: '${id}' not found`);
    }
  }
}
