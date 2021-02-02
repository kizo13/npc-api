import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import SessionTokenDataDto from '../dtos/session-token-data.dto';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const authorization = request?.headers?.authorization;
          if (authorization && authorization.startsWith('Refresh ')) {
            return authorization.replace('Refresh ', '');
          }
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: SessionTokenDataDto) {
    const authorization = request?.headers?.authorization;
    let refreshToken;
    if (authorization && authorization.startsWith('Refresh ')) {
      refreshToken = authorization.replace('Refresh ', '');
    }
    return this.userService.getUserIfRefreshTokenMatches(
      `${payload.sub}`,
      refreshToken,
    );
  }
}
