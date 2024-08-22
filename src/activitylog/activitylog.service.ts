import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreActivityLogDto } from 'src/activitylog/dto/store-activity-log.dto';
import { ActivityLogRepository } from './activity-log.repository';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLogRepository)
    private activityLogRepository: ActivityLogRepository,
  ) {}

  async logActivity(createActivityLogDto: StoreActivityLogDto) {
    await this.activityLogRepository.logActivity(createActivityLogDto);
  }

  /*async findLogs(
    options: FindActivityLogsOptions,
  ): Promise<{ logs: ActivityLog[]; total: number }> {
    const {
      page = 1,
      pageSize = 10,
      filter = '',
      sortBy = 'timestamp',
      sortOrder = 'DESC',
    } = options;

    const queryBuilder = this.activityLogRepository
      .createQueryBuilder('activityLog')
      .where('activityLog.action LIKE :filter', { filter: `%${filter}%` })
      .orderBy(sortBy, sortOrder)
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [logs, total] = await queryBuilder.getManyAndCount();

    return { logs, total };
  }

  async deleteLog(id: number) {
    await this.activityLogRepository.delete(id);
  }*/

  private getClientIp(): string {
    // Implement logic to get the client's IP address
    // Consider using a middleware or library for this
    return '127.0.0.1'; // Example
  }
}
