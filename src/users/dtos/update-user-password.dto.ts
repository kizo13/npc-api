import { IsString } from 'class-validator';

class UpdateUserPasswordDto {
  @IsString()
  public password: string;
}

export default UpdateUserPasswordDto;
