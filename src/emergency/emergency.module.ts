import { Module } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { EmergencyController } from './emergency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emergency } from './entities/emergency.entity';
import { TransactionalEmailsApi } from '@sendinblue/client';
import { City } from 'src/city/entities/city.entity';
import { MailService } from './mail.service';
import { AdminEmergencyController } from './admin/admin.controller';
import { AdminEmergencyService } from './admin/admin.service';
import { DonationsService } from '@donations/donations.service';
import { Donation } from '@donations/entities/donation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Emergency,City,Donation])],
  controllers: [EmergencyController,AdminEmergencyController],
  providers: [EmergencyService,TransactionalEmailsApi,MailService,AdminEmergencyService,DonationsService]
})
export class EmergencyModule {}
