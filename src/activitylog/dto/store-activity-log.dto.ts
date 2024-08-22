import { IsDate, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class StoreActivityLogDto {
  user: User;

  @IsString()
  action: string;

  @IsDate()
  timestamp: Date;

  @IsString()
  ipAddress: string;
}
