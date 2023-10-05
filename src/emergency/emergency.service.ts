import { Injectable } from '@nestjs/common';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Emergency } from './entities/emergency.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TransactionalEmailsApi } from '@sendinblue/client';
import { City } from 'src/city/entities/city.entity';
import { MailService } from './mail.service';

@Injectable()
export class EmergencyService {
  constructor(
    @InjectRepository(Emergency)
    private readonly emergencyRepo: Repository<Emergency>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    private mailService: MailService,
  ) {}
  async createEmergency(createEmergencyDto: CreateEmergencyDto):Promise<any> {
    const { city, ...emergencyDetails } = createEmergencyDto;
    let emergency:Emergency = await this.emergencyRepo.save(emergencyDetails);

    var cityExists = await this.cityRepository.findOne({
      where: { city: city },
    });
    if (!cityExists) {
      cityExists = await this.cityRepository.save({ city });
    }

    emergency.city = cityExists;
    emergency.status = false
    
    await this.emergencyRepo.save(emergency);
   return  await this.mailService.sendUserConfirmation(createEmergencyDto);

   
  }
}
