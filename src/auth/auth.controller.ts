import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import RequestWithUser from 'src/_shared/dtos/request-with-user.dto';
import { JwtAuthGuard } from 'src/_shared/guards/jwt-auth.guard';
import JwtRefreshGuard from 'src/_shared/guards/jwt-refresh.guard';
import { LocalAuthGuard } from 'src/_shared/guards/local-auth.guard';
import { AuthService } from './auth.service';
import LoginRequestDto from './dtos/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() body: LoginRequestDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() request: RequestWithUser) {
    return this.authService.logout(`${request.user.id}`);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    return this.authService.refresh(request.user.email);
  }
}
