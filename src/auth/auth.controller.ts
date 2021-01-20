import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/_shared/guards/auth.guard';
import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginRequestDto, @Req() req) {
    return this.authService.login(body, req);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req) {
    req.res.setHeader(
      'Set-Cookie',
      `AuthSession=; HttpOnly; Path=/; Max-Age=0`,
    );
  }
}
