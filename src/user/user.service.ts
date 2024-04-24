import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Login
   * @param loginDto
   * @returns
   */
  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const bytes = CryptoJS.AES.decrypt(loginDto.password, 'prOrV8XPyf');
    const password = bytes.toString(CryptoJS.enc.Utf8);

    console.log(password);

    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      relations: { role: true },
    });
    if (!user) {
      throw new NotFoundException(this.i18n.t('user.USER_NOT_FOUND'));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(this.i18n.t('user.PASSWORD_INCORRECT'));
    }

    const tokens = await this.generateTokens(user.id, user.email, user);
    await this.updateRt(user.id, tokens.refresh_token);
    return tokens;
  }

  /**
   * Generate tokens
   * @param userId
   * @param email
   * @param user
   * @returns
   */
  async generateTokens(
    userId: number,
    email: string,
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const jwtPayload = {
      userId: userId,
      email: email,
      user: user,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('SECRET_ACCESS_JWT'),
        expiresIn: this.config.get<string>('TOKEN_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('SECRET_ACCESS_JWT'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  /**
   * Update refresh token
   * @param userId
   * @param rt
   */
  async updateRt(userId: number, rt: string): Promise<void> {
    const user: User = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(this.i18n.t('user.USER_NOT_FOUND'));
    }

    user.refresh_token = rt;
    await this.userRepository.save(user);
  }
}
