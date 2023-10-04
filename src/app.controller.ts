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

  @Get('donation')
  @Render("donation")
  renderDonation(){}

  @Get('emergency')
  @Render('emergency')
  renderEmergency(){}

  @Get('login')
  @Render('login')
  renderLogin(){}
  
  @UseGuards(AuthGuard)
  @Get('admin')
  @Render('adminPanelHome')
  renderAdminPanel(){}

  @UseGuards(AuthGuard)
  @Get("admin/city")
  @Render("city")
  renderAdminCity(){}

  @UseGuards(AuthGuard)
  @Get('admin/emergency')
  @Render("emergencyAdmin")
  renderAdminEmergency(){}

  @UseGuards(AuthGuard)
  @Get('admin/donation')
  @Render("Donationadmin")
  renderAdminDonation(){}

  @UseGuards(AuthGuard)
  @Get('admin/update')
  @Render("updateDonation")
  renderAdminUpdateDonation(){}
}
