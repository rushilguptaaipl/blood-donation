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
import { UserService } from '@user/user.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller("admin")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {   
    return await this.userService.login(loginDto);
  }
}
