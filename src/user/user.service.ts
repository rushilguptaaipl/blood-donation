import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
   constructor( @InjectRepository(User) private readonly userRepository: Repository<User>,
   private readonly jwtService:JwtService){}
   
    

    async login(loginDto: LoginDto):Promise<any>  {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
        if (user?.password !== loginDto.password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.email, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
