import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DonationsModule } from 'src/donations/donations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from 'src/donations/entities/donation.entity';


@Module({
  imports:[DonationsModule,TypeOrmModule.forFeature([Donation])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
