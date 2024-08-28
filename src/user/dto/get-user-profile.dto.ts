import { IsString, MaxLength, MinLength } from 'class-validator';

export class GetUserProfileDto {
  @IsString()
  username: string;

  @MinLength(4)
  @MaxLength(32)
  password: string;
}
