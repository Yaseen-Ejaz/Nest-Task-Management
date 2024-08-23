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

  async getLogs(): Promise<ActivityLog[]> {
    const queryBuilder = this.createQueryBuilder('activityLog');

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    queryBuilder.where(
      'activityLog.timestamp >= :todayStart AND activityLog.timestamp <= :todayEnd',
      { todayStart, todayEnd },
    );

    queryBuilder.skip(0 * 5).take(5);

    return queryBuilder.getMany();
  }
}
