import { Module } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { EmergencyController } from './emergency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emergency } from './entities/emergency.entity';
import { TransactionalEmailsApi } from '@sendinblue/client';
import { City } from 'src/city/entity/city.entity';
import { MailService } from './mail.service';

@Module({
  imports:[TypeOrmModule.forFeature([Emergency,City])],
  controllers: [EmergencyController],
  providers: [EmergencyService,TransactionalEmailsApi,MailService]
})
export class EmergencyModule {}
