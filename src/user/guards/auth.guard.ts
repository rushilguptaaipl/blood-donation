import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/constants';
import { parse } from 'path';
import * as jwt from 'jsonwebtoken';

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
      // console.log(cookie[0]);
    }
   const  res =  isTokenExpired(cookie[0])
      if(res){
        response.redirect('login');
      }

    try {
      const payload = await this.jwtService.verifyAsync(cookie[0], {
        secret: jwtConstants.secret,
      });
      // console.log(payload);

      for (let i = 0; i < payload.length; i++) {
        // console.log(payload[i]);
      }
      const { sub, iat, exp, ...pay } = payload;
      // console.log(pay.role);

      if (pay.role == 'superadmin') {
        // console.log("done with all");
        
        return true;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;



  }




}
function isTokenExpired(token: string): boolean {
  try {
    const decodedToken : any = jwt.verify(token, jwtConstants.secret); 
    const expirationTime = new Date(decodedToken.exp * 1000); 
    console.log(expirationTime);
    
    // Compare the expiration time to the current time
    return expirationTime <= new Date();
  } catch (error) {
    // If there's an error, the token is invalid or expired
    return true;
  }
}
