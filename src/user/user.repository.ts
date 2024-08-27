import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { StoreActivityLogDto } from 'src/activitylog/dto/store-activity-log.dto';
import { ActivityLogRepository } from 'src/activitylog/activity-log.repository';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private activityLogRepository: ActivityLogRepository
  ) {
    super(User, dataSource.createEntityManager());
  }

  async getUserProfile(id: string): Promise<User> {
    const userInfo = await this.findOne({
      where: { id: id },
    });
    return userInfo;
  }

  async updateUserProfile(id: string, pfp: string, ip: string): Promise<void> {
    const userInfo = await this.getUserProfile(id);
    userInfo.profilePicture = pfp;
    await this.save(userInfo);

    const activityLogDto = new StoreActivityLogDto();
    activityLogDto.user = userInfo;
    activityLogDto.ipAddress = String(ip);
    activityLogDto.action = 'Profile Picture Updated';
    activityLogDto.timestamp = new Date();

    await this.activityLogRepository.logActivity(activityLogDto);
  }
}
