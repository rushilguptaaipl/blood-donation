import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
   url :string
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.url = "http://3.27.149.171"
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const result = request.headers.cookie;
    
    const decodedCookieValue = decodeURIComponent(result);
    
    if(decodedCookieValue.includes("j:")){
      const cookieParts = decodedCookieValue.split('j:');
      var jss = JSON.parse(cookieParts[1]);
      var res = isTokenExpired(jss.access_token);
    }
    else{
      response.redirect(this.url + '/login'); 
    }
    
    if (res) {
      response.redirect(this.url+'/login');
    }
    try {
      const payload = await this.jwtService.verifyAsync(jss.access_token, {
        secret: jwtConstants.secret,
      });

      if (payload.role == 'superadmin') {
        return true;
      }
    } catch {
      throw new UnauthorizedException("Not a valid User");
    }
    return true;
  }
}
function isTokenExpired(token: string): boolean {
  try {
    const decodedToken: any = jwt.verify(token, jwtConstants.secret);
    const expirationTime = new Date(decodedToken.exp * 1000);
    // Compare the expiration time to the current time
    return expirationTime <= new Date();
  } catch (error) {
    // If there's an error, the token is invalid or expired
    return true;
  }
}
