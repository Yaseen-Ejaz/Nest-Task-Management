import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from 'src/activitylog/activity-log.entity'; // Assuming this path is correct
import { ActivityLogService } from './activitylog.service';
import { ActivityLogRepository } from './activity-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog])], // Register ActivityLog entity with TypeORM
  providers: [ActivityLogService, ActivityLogRepository],
  exports: [ActivityLogService, ActivityLogRepository], // Make ActivityLogService available for injection
})
export class ActivityLogModule {}
