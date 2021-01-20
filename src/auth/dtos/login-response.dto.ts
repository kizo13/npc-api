class LoginResponseDto {
  ok: boolean;
  data: {
    id: number;
    username: string;
    email: string;
    avatar_id: number;
    is_active: boolean;
  };
}

export default LoginResponseDto;
