import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AdminModule } from './admin/admin.module';
import { ActivityLogModule } from './activitylog/activitylog.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'user-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({
      storage: memoryStorage(),
      dest: './uploads',
    }),
    AuthModule,
    AdminModule,
    ActivityLogModule,
  ],
})
export class AppModule {}
