import { IsNumber, IsOptional, IsString } from 'class-validator';
import Avatar from 'src/avatars/avatar.entity';

class UpdateUserDto {
  @IsString()
  @IsOptional()
  public password: string;

  @IsNumber()
  @IsOptional()
  public avatar: Avatar;
}

export default UpdateUserDto;
