import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login-submit')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.userService.login(loginDto);
    const cookie = await response.cookie('auth-token', result);
    return true;
  }
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    await response.cookie('auth-token', '');
    return true;
  }
}
