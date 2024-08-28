import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { StoreActivityLogDto } from 'src/activitylog/dto/store-activity-log.dto';
import { ActivityLogRepository } from 'src/activitylog/activity-log.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { concat } from 'rxjs';
import { profile } from 'console';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private activityLogRepository: ActivityLogRepository,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async getUserProfile(id: string): Promise<User> {
    const userInfo = await this.findOne({
      where: { id: id },
    });
    return userInfo;
  }

  async updateUserProfile(
    id: string,
    updateProfileDto: UpdateProfileDto,
    ip: string,
  ): Promise<void> {
    const userInfo = await this.findOne({
      where: { id: id },
    });
    const { username, profilePicture } = updateProfileDto;
    let updateString = '';
    const activityLogDto = new StoreActivityLogDto();
    activityLogDto.user = userInfo;
    activityLogDto.ipAddress = String(ip);

    if (profilePicture) {
      userInfo.profilePicture = profilePicture;
      updateString += ' Profile Picture Updated';
    }

    if (username) {
      userInfo.username = username;
      updateString += ' Username Updated';
    }

    userInfo.updatedAt = new Date();
    this.save(userInfo); // Update the user(userInfo); // Ensure this is awaited if it's an async operation
    activityLogDto.action = updateString;
    activityLogDto.timestamp = new Date();
    await this.activityLogRepository.logActivity(activityLogDto);
  }
}
