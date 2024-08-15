import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
