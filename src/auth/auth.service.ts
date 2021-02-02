import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import LoginRequestDto from './dtos/login-request.dto';
import LoginResponseDto from './dtos/login-response.dto';
import SessionTokenDataDto from './dtos/session-token-data.dto';
import { UsersService } from 'src/users/users.service';
import { updateBlobToBase64 } from 'src/_shared/helpers/image.helper';
import TokenResponseDto from './dtos/token-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUser(email, pass);
    if (user) {
      return user;
    }
    return null;
  }

  async login(body: LoginRequestDto): Promise<LoginResponseDto> {
    const storedUser = await this.usersService.findOneByEmail(body.email);
    if (!storedUser) throw new UnauthorizedException();

    storedUser.avatar = updateBlobToBase64(storedUser.avatar);
    const accessTokenPayload: SessionTokenDataDto = { sub: storedUser.id };
    const refreshTokenPayload: SessionTokenDataDto = { sub: storedUser.id };
    const refresh_token = this.jwtService.sign(refreshTokenPayload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
    await this.usersService.updateRefreshToken(
      `${storedUser.id}`,
      bcrypt.hashSync(refresh_token, 10),
    );
    const { password: _password, ...rest } = storedUser;
    return {
      access_token: this.jwtService.sign(accessTokenPayload),
      refresh_token,
      data: rest,
    };
  }

  async refresh(email: string): Promise<TokenResponseDto> {
    const storedUser = await this.usersService.findOneByEmail(email);
    if (!storedUser) throw new UnauthorizedException();

    storedUser.avatar = updateBlobToBase64(storedUser.avatar);
    const accessTokenPayload: SessionTokenDataDto = { sub: storedUser.id };
    const { password: _password, ...rest } = storedUser;
    return {
      access_token: this.jwtService.sign(accessTokenPayload),
      data: rest,
    };
  }

  logout(id: string) {
    return this.usersService.updateRefreshToken(id, null);
  }
}
