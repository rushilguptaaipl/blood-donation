import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';
import { City } from 'src/city/entities/city.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepo: Repository<Donation>,
    @InjectRepository(City)
    private cityRepo: Repository<City>,
  ) {}

  async createDonation(createDonationDto: CreateDonationDto) : Promise<Donation> {

    let donationExist: Donation = await this.donationRepo.findOne({
      where: {
        name: createDonationDto.name,
        DOB: createDonationDto.DOB,
        blood_group: createDonationDto.blood_group,
        contact: createDonationDto.contact,
        email: createDonationDto.email,
        city:{city:createDonationDto.city}
      },
      relations: ['city'],
    });

    if (donationExist) {
      throw new ConflictException('Donation Already Exists');
    }

   const donation = new Donation()
   donation.name = createDonationDto.name;
   donation.email  = createDonationDto.email;
   donation.gender = createDonationDto.gender;
   donation.disease = createDonationDto.disease;
   donation.contact = createDonationDto.contact;
   donation.blood_group = createDonationDto.blood_group;
   donation.DOB = createDonationDto.DOB;
   donation.createdAt = new Date(Date.now());
   donation.updatedAt = new Date(Date.now());

   const result  = await this.donationRepo.save(donation)

    var cityExists: City = await this.cityRepo.findOne({where: { city: createDonationDto.city },});

    if(!cityExists)
    {
      const city =  new City()
      city.city = createDonationDto.city;
      city.createdAt = new Date(Date.now());
      city.updatedAt = new Date(Date.now());
      cityExists  = await this.cityRepo.save(city)
    }

    result.city = cityExists;

    return await this.donationRepo.save(result);
  }

}
