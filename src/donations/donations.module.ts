import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { City } from 'src/city/entity/city.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Donation,City])],
  controllers: [DonationsController],
  providers: [DonationsService],
  exports:[DonationsService]
})
export class DonationsModule {}
