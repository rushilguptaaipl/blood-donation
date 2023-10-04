import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './user/guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('home')
  @Render('home')
  renderHome(){}

  @Get('admin')
  @Render('adminPanelHome')
  renderAdminPanel(){}

  @Get("admin/city")
  @Render("city")
  renderAdminCity(){}

  @Get('admin/emergency')
  @Render("emergencyAdmin")
  renderAdminEmergency(){}

  @Get('admin/donation')
  @Render("Donationadmin")
  renderAdminDonation(){}

  @Get('admin/update')
  @Render("updateDonation")
  renderAdminUpdateDonation(){}
}
