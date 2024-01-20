import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';
import { City } from 'src/city/entities/city.entity';
import { BooleanMessage } from 'src/user/interface/booleanMessage.interface';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async createDonation(createDonationDto: CreateDonationDto): Promise<BooleanMessage> {
    let isDonationExist: Donation = await this.donationRepository.findOne({
      where: {
        name: createDonationDto.name,
        DOB: createDonationDto.DOB,
        blood_group: createDonationDto.blood_group,
        contact: createDonationDto.contact,
        email: createDonationDto.email,
        city: { city: createDonationDto.city },
      },
      relations: ['city'],
    });

    if (isDonationExist) {
      throw new ConflictException('Donation Already Exists');
    }

    const donation = new Donation();
    donation.name = createDonationDto.name;
    donation.email = createDonationDto.email;
    donation.gender = createDonationDto.gender;
    donation.disease = createDonationDto.disease;
    donation.contact = createDonationDto.contact;
    donation.blood_group = createDonationDto.blood_group;
    donation.DOB = createDonationDto.DOB;
    donation.createdAt = new Date(Date.now());
    donation.updatedAt = new Date(Date.now());

    let city: City = await this.cityRepository.findOne({
      where: { city: createDonationDto.city },
    });

    if (!city) {
      const newCity = new City();
      newCity.city = createDonationDto.city;
      newCity.createdAt = new Date(Date.now());
      newCity.updatedAt = new Date(Date.now());
      city = await this.cityRepository.save(newCity);
    }
    
    donation.city = city;

    await this.donationRepository.save(donation)

    return {
      message: 'Donar Saved Successfully',
      success: true,
    };
  }
}
