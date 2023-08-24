import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Query,
  Param,
  Redirect,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { DonationsService } from 'src/donations/donations.service';
import { Donation } from 'src/donations/entities/donation.entity';
import { City } from 'src/city/entity/city.entity';
import { AdminFindDonationDto } from './dto/findDonation.dto';
import { deleteDonation } from './dto/delete-donation.dto';
import { AdminUpdateDonationDto } from './dto/updateDonation.dto';
import { deleteEmergencyDto } from './dto/delete-emergency.dto';

@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly donationsService: DonationsService,
  ) {}

  @Post('/search')
  @Render('Donationadmin')
  async adminFindDonation(@Body() adminFindDonationDto: AdminFindDonationDto) {
    const donationList: Donation[] = await this.adminService.adminFindDonation(
      adminFindDonationDto,
    );
    const cityList: City[] = await this.adminService.searchCityList();
    return { donationList, cityList };
  }

  @Get('admin')
  @Render('Donationadmin')
  async findAll() {
    const donationList: Donation[] = await this.adminService.findAll();
    const cityList: City[] = await this.adminService.searchCityList();
    return { donationList, cityList };
  }

  @Get('emergencyadmin')
  @Render('emergencyAdmin')
  async findAllEmergency() {
    const emergencyList = await this.adminService.findAllEmergency();
    return { emergencyList };
  }

  @Get('deletedonation')
  @Redirect('admin')
  async adminDeleteDonation(@Query() deleteDonation: deleteEmergencyDto) {
    let id = parseInt(deleteDonation.id);
    return this.adminService.adminDeleteDonation(id);
  }

  @Post('admin/update')
  async adminUpdateDonation(
    @Body() adminUpdateDonationDto: AdminUpdateDonationDto,
  ) { 
    let id = parseInt(adminUpdateDonationDto.id);

    return this.adminService.adminUpdateDonation(adminUpdateDonationDto,id);
  }

  @Get('deleteemergency')
  @Redirect('emergencyadmin')
  async adminDeleteEmergency(@Query() deleteEmergency: deleteEmergencyDto) {
    let id = parseInt(deleteEmergency.id);

    return this.adminService.adminDeleteEmergency(id);
  }

  @Get('updatedonation')
  @Render('updateDonation')
  async showPreviousValuesUpdate(@Query() update: deleteEmergencyDto) {
    let id = parseInt(update.id);

    const donation = await this.adminService.showPreviousValuesUpdate(id);
    return {donation};
  }
}
