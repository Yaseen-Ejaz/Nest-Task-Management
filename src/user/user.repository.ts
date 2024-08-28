import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { StoreActivityLogDto } from 'src/activitylog/dto/store-activity-log.dto';
import { ActivityLogRepository } from 'src/activitylog/activity-log.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';

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
    let updatePFPFlag = false;
    let updateUserFlag = false;
    let updateString = '';
    let oldUsername = '';
    let oldProfilePicture = '';
    const activityLogDto = new StoreActivityLogDto();
    activityLogDto.user = userInfo;
    activityLogDto.ipAddress = String(ip);

    if (profilePicture && userInfo.profilePicture != profilePicture) {
      oldProfilePicture = userInfo.profilePicture;
      userInfo.profilePicture = profilePicture;
      updatePFPFlag = true;
    }

    if (username && userInfo.username != username) {
      oldUsername = userInfo.username;
      userInfo.username = username;
      updateUserFlag = true;
    }

    if (updateUserFlag || updatePFPFlag) {
      userInfo.updatedAt = new Date();
      this.save(userInfo);

      if (updateUserFlag) {
        updateString = 'Username Updated';
        activityLogDto.action = updateString;
        activityLogDto.timestamp = new Date();
        activityLogDto.storeValue = oldUsername;
        await this.activityLogRepository.logActivity(activityLogDto);
      }

      if (updatePFPFlag) {
        updateString = 'Profile Picture Updated';
        activityLogDto.action = updateString;
        activityLogDto.timestamp = new Date();
        activityLogDto.storeValue = oldProfilePicture;
        await this.activityLogRepository.logActivity(activityLogDto);
      }
    }
  }
}
