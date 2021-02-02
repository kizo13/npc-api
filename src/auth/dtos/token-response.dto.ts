import { User } from 'src/users/user.entity';

class TokenResponseDto {
  access_token: string;
  data: Omit<User, 'password'>;
}

export default TokenResponseDto;
