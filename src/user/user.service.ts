import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly i18n : I18nService
  ) {}

  /**
   * Login
   * @param loginDto
   * @returns
   */
  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new NotFoundException(this.i18n.t("user.USER_NOT_FOUND"));
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(this.i18n.t("user.PASSWORD_INCORRECT"));
    }
    const payload = { sub: user.email, role: user.role, user: user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
