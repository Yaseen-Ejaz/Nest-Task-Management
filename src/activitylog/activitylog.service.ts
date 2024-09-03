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
    await this.activityLogRepository.afterInsert(createActivityLogDto);
  }
}
