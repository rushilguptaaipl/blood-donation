import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DonationsService } from 'src/donations/donations.service';
import { Donation } from 'src/donations/entities/donation.entity';
import { City } from 'src/city/entity/city.entity';
import { AdminFindDonationDto } from './dto/findDonation.dto';
import { deleteDonation } from './dto/delete-donation.dto';
import { AdminUpdateDonationDto } from './dto/updateDonation.dto';

@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly donationsService: DonationsService,
  ) {}

  @Post('/search')
  @Render('admin')
  async adminFindDonation(@Body() adminFindDonationDto: AdminFindDonationDto) {
    const donationList: Donation[] = await this.adminService.adminFindDonation(
      adminFindDonationDto,
    );
    const cityList: City[] = await this.adminService.searchCityList();
    return { donationList, cityList };
  }

  @Get('admin')
  @Render('admin')
  async findAll() {
    const donationList: Donation[] = await this.adminService.findAll();
    const cityList: City[] = await this.adminService.searchCityList();
    return { donationList, cityList };
  }

  @Get()
  async findAllEmergency() {
    const emergencyList = await this.adminService.findAllEmergency();
  }

  @Post('delete')
  async adminDeleteDonation(@Body() deleteDonation: deleteDonation) {
    return this.adminService.adminDeleteDonation(deleteDonation);
  }

  @Post('admin/update')
  async adminUpdateDonation(
    @Body() adminUpdateDonationDto: AdminUpdateDonationDto,
  ) {
    return this.adminService.adminUpdateDonation(adminUpdateDonationDto);
  }
}
