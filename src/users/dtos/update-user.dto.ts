import { IsNumber, IsOptional, IsString } from 'class-validator';

class UpdateUserDto {
  @IsString()
  @IsOptional()
  public password: string;

  @IsNumber()
  @IsOptional()
  public avatarId: number;
}

export default UpdateUserDto;
