import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller()
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post('registeration')
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  // @Get("home")
  // @Render('home')
  // getHome() {

  // }
}
