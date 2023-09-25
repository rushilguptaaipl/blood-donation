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
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        //   const cookies = request.headers.cookie;
        const cookies = parse(request.headers.cookie || '');

        // console.log(cookies);

        let cookie = cookies.base.split("access_token%22%3A%22")
        cookie = cookie[1].split("%")
        console.log(cookie[0]);

        //   console.log(cookie[1]);

        if (!cookies) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                cookie[0],
                {
                    secret: jwtConstants.secret
                }
            );
            console.log(payload);

            for (let i = 0; i < payload.length; i++) {
                console.log(payload[i]);

            }
            const { sub, iat, exp, ...pay } = payload;
            console.log(pay.role);

            if (pay.role == "superadmin") {
                return true
            }

        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    // private extractTokenFromHeader(cookie){
    //   const [type, token] = cookie.headers.authorization?.split(' ') ?? [];
    //   return type === 'Bearer' ? token : undefined;
    // }
}