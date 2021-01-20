import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jwt-simple';
import SessionTokenDataDto from 'src/auth/dtos/session-token-data.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    @Inject('UsersService') private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authSessionCookie = request.cookies && request.cookies['AuthSession'];
    if (!authSessionCookie) throw new UnauthorizedException();
    let userData: SessionTokenDataDto;
    try {
      userData = jwt.decode(
        authSessionCookie,
        this.configService.get('JWT_SECRET'),
      );
    } catch (error) {
      throw new UnauthorizedException();
    }
    const now = new Date();
    if (new Date(userData.expires) < now) throw new UnauthorizedException();
    const storedUser = await this.usersService.findOneByEmail(
      userData.email,
      true,
    );
    if (!storedUser) throw new UnauthorizedException();
    return true;
  }
}
