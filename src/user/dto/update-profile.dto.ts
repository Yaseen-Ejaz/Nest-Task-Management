import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;
}
