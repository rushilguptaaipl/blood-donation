import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/constants';
import { parse } from 'path';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    //   const cookies = request.headers.cookie;
    const cookies = parse(request.headers.cookie || '');
    //
    // console.log(cookies);
    if (!cookies.base) {
      response.redirect('login');
    }
    if (cookies?.base) {
      var cookie = cookies.base.split('access_token%22%3A%22');
      cookie = cookie[1].split('%');
      console.log(cookie[0]);
    }

    //   console.log(cookie[1]);

    try {
      const payload = await this.jwtService.verifyAsync(cookie[0], {
        secret: jwtConstants.secret,
      });
      console.log(payload);

      for (let i = 0; i < payload.length; i++) {
        console.log(payload[i]);
      }
      const { sub, iat, exp, ...pay } = payload;
      console.log(pay.role);

      if (pay.role == 'superadmin') {
        console.log("done with all");
        
        return true;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
