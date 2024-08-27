import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ActivityLogRepository } from 'src/activitylog/activity-log.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService, UserRepository, ActivityLogRepository],
  controllers: [UserController],
})
export class UserModule {}
