import { User } from 'src/users/user.entity';

class LoginResponseDto {
  ok: boolean;
  data: Omit<User, 'password'>;
}

export default LoginResponseDto;
