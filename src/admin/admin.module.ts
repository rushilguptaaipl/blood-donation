import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DonationsModule } from 'src/donations/donations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from 'src/donations/entities/donation.entity';
import { City } from 'src/city/entity/city.entity';
import { Emergency } from 'src/emergency/entities/emergency.entity';



@Module({
  imports:[DonationsModule,TypeOrmModule.forFeature([Donation,City,Emergency])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
