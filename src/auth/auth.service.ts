import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as argon2 from 'argon2';
import * as jwt from 'jwt-simple';
import LoginRequestDto from './dtos/login-request.dto';
import LoginResponseDto from './dtos/login-response.dto';
import SessionTokenDataDto from './dtos/session-token-data.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async login(body: LoginRequestDto, req: Request): Promise<LoginResponseDto> {
    const storedUser = await this.usersService.findOneByEmail(body.email);
    if (!storedUser) throw new UnauthorizedException();

    const isPassVerified = await argon2.verify(
      storedUser.password,
      body.password,
    );
    if (!isPassVerified) throw new UnauthorizedException();

    const date = new Date();
    const expireDate = new Date(
      date.getTime() + this.configService.get('JWT_EXPIRATION_TIME') * 60000,
    );
    const tokenData: SessionTokenDataDto = {
      id: storedUser.id,
      email: body.email,
      expires: expireDate,
    };
    const token = jwt.encode(tokenData, this.configService.get('JWT_SECRET'));
    const cookie = `AuthSession=${token}; HttpOnly; Path=/; Expires=${expireDate}`;
    req.res.setHeader('Set-Cookie', cookie);
    const { password: _password, ...rest } = storedUser;
    return {
      ok: true,
      data: { ...rest },
    };
  }

  decodeToken(token: string): SessionTokenDataDto {
    return jwt.decode(token, this.configService.get('JWT_SECRET'));
  }
}
