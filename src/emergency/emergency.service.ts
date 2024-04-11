import { Injectable } from '@nestjs/common';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Emergency } from './entities/emergency.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TransactionalEmailsApi } from '@sendinblue/client';
import { City } from 'src/city/entities/city.entity';
import { MailService } from './mail.service';
import { BooleanMessage } from 'src/user/interface/booleanMessage.interface';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class EmergencyService {
  constructor(
    @InjectRepository(Emergency)
    private readonly emergencyRepo: Repository<Emergency>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    private mailService: MailService,
    private readonly i18n : I18nService
  ) {}

  /**
   * Created Emergency
   * @param createEmergencyDto 
   * @returns 
   */
  async createEmergency(createEmergencyDto: CreateEmergencyDto):Promise<BooleanMessage> {

    const emergency = new Emergency()
    emergency.registerar_name = createEmergencyDto.registerar_name;
    emergency.patient_name = createEmergencyDto.patient_name;
    emergency.contact = createEmergencyDto.contact
    emergency.email = createEmergencyDto.email;
    emergency.age = createEmergencyDto.age;
    emergency.hospital = createEmergencyDto.hospital;
    emergency.blood_group = createEmergencyDto.blood_group;
    emergency.gender = createEmergencyDto.gender

    let cityExists = await this.cityRepository.findOne({
      where: { city: createEmergencyDto.city },
    });
    if (!cityExists) {
      const city = new City()
      city.city = createEmergencyDto.city,
      cityExists = await this.cityRepository.save(city);
    }

    emergency.city = cityExists;
    emergency.status = false
    
    await this.emergencyRepo.save(emergency);
    try{
      await this.mailService.sendAdminConfirmation(createEmergencyDto);
    }
    catch(error){
      console.log("UNABLE TO SEND EMAIL");  
    }
    return{
      success : true,
      message : this.i18n.t("emergency.EMEGENCY_SENT_SUCCESSFULLY")
    }
   
  }
}
