import { Injectable } from '@nestjs/common';
import { ActivityLog } from 'src/activitylog/activity-log.entity';
import { StoreActivityLogDto } from 'src/activitylog/dto/store-activity-log.dto';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class ActivityLogRepository extends Repository<ActivityLog> {
  constructor(private dataSource: DataSource) {
    super(ActivityLog, dataSource.createEntityManager());
  }

  async logActivity(createActivityLogDto: StoreActivityLogDto) {
    const { user, action, timestamp, ipAddress } = createActivityLogDto;
    const activityLog = this.create({
      user,
      action,
      timestamp,
      ipAddress,
    });
    await this.save(activityLog);
  }
}
