import TokenResponseDto from './token-response.dto';

class LoginResponseDto extends TokenResponseDto {
  refresh_token: string;
}

export default LoginResponseDto;
