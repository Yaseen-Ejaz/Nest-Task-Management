import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { ActivityLogRepository } from 'src/activitylog/activity-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, RolesGuard, ActivityLogRepository],
})
export class AdminModule {}
