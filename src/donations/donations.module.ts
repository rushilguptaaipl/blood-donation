import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { City } from 'src/city/entity/city.entity';
import { AdminDonationContoller } from './admin/admin.controller';
import { AdminDonationService } from './admin/admin.service';


@Module({
  imports:[TypeOrmModule.forFeature([Donation,City])],
  controllers: [DonationsController,AdminDonationContoller],
  providers: [DonationsService,AdminDonationService],
  exports:[DonationsService]
})
export class DonationsModule {}
