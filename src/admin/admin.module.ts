import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DonationsModule } from 'src/donations/donations.module';


@Module({
  imports:[DonationsModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
