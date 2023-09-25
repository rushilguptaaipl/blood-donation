import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Query,
  Param,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { DonationsService } from 'src/donations/donations.service';
import { Donation } from 'src/donations/entities/donation.entity';
import { City } from 'src/city/entity/city.entity';
import { AdminFindDonationDto } from './dto/findDonation.dto';
import { deleteDonation } from './dto/delete-donation.dto';
import { AdminUpdateDonationDto } from './dto/updateDonation.dto';
import { deleteEmergencyDto } from './dto/delete-emergency.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly donationsService: DonationsService,
  ) {}
  @UseGuards(AuthGuard)
  @Post('/search')
  @Render('Donationadmin')
  async adminFindDonation(@Body() adminFindDonationDto: AdminFindDonationDto) {
    const donationList: Donation[] = await this.adminService.adminFindDonation(
      adminFindDonationDto,
    );
    const cityList: City[] = await this.adminService.searchCityList();
    return { donationList, cityList };
  }
  @UseGuards(AuthGuard)
  @Get('admindonation')
  @Render('Donationadmin')
  async findAll() {
    const donationList: Donation[] = await this.adminService.findAll();
    const cityList: City[] = await this.adminService.searchCityList();
    return { donationList, cityList };
  }
  @UseGuards(AuthGuard)
  @Get('emergencyadmin')
  @Render('emergencyAdmin')
  async findAllEmergency() {
    const emergencyList = await this.adminService.findAllEmergency();
    return { emergencyList };
  }
  @UseGuards(AuthGuard)
  @Get('deletedonation')
  @Redirect('admindonation')
  async adminDeleteDonation(@Query() deleteDonation: deleteEmergencyDto) {
    let id = parseInt(deleteDonation.id);
    return this.adminService.adminDeleteDonation(id);
  }
  @UseGuards(AuthGuard)
  @Post('admin/update')
  @Render('successupdatedonation')
  async adminUpdateDonation(
    @Body() adminUpdateDonationDto: AdminUpdateDonationDto,
  ) { 
    let id = parseInt(adminUpdateDonationDto.id);

    return this.adminService.adminUpdateDonation(adminUpdateDonationDto,id);
  }
  @UseGuards(AuthGuard)
  @Get('deleteemergency')
  @Redirect('emergencyadmin')
  async adminDeleteEmergency(@Query() deleteEmergency: deleteEmergencyDto) {
    let id = parseInt(deleteEmergency.id);

    return this.adminService.adminDeleteEmergency(id);
  }
  @UseGuards(AuthGuard)
  @Get('updatedonation')
  @Render('updateDonation')
  async showPreviousValuesUpdate(@Query() update: deleteEmergencyDto) {
    let id = parseInt(update.id);

    const donation = await this.adminService.showPreviousValuesUpdate(id);
    return {donation};
  }
}
