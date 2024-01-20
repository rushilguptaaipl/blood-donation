import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './user/guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
