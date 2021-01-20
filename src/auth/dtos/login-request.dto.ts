import { IsNotEmpty, IsString } from 'class-validator';

class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export default LoginRequestDto;
