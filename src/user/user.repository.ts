import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserProfile(id: string): Promise<User> {
    const userInfo = await this.findOne({
      where: { id: id },
    });
    return userInfo;
  }
}
