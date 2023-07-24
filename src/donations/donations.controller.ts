import { Controller, Get, Post, Body, Res, Render } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller()
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  
  @Post('registeration')
  create(@Body() createDonationDto: CreateDonationDto , @Res() res: Response) {
    return this.donationsService.create(createDonationDto);
  }

  @Get("home")
  @Render('donation')
  getDonation() {}

 
}
