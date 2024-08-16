import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
