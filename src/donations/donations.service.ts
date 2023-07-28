import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';
import { FindAdminDto } from 'src/admin/dto/find-admin.dto';
import { City } from './entities/city.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepo: Repository<Donation>,
    @InjectRepository(City)
    private cityRepo: Repository<City>,
  ) {}

  // create the donation entry in the donation table
  async create(createDonationDto: CreateDonationDto) {
    const { city, ...donation_details } = createDonationDto;

    const donationExist: Donation[] = await this.donationRepo.find({
      where: {
        name: donation_details.name,
        DOB: donation_details.DOB,
        blood_group: donation_details.blood_group,
        contact : donation_details.contact,
        email : donation_details.email
      },
      relations: ['city'],
    });

    if(donationExist){
      return new ConflictException("user already exists");
    }

    const cityExists: City = await this.cityRepo.findOne({
      where: { city: city },
      relations: ['donation'],
    });
    if (!cityExists) {
      await this.cityRepo.save({ city: city });
      const cityExists: City = await this.cityRepo.findOne({
        where: { city: city },
        relations: ['donation'],
      });
      await this.donationRepo.save(donation_details);
      const donationExist: Donation[] = await this.donationRepo.find({
        where: {
          name: donation_details.name,
          DOB: donation_details.DOB,
          blood_group: donation_details.blood_group,
        },
        relations: ['city'],
      });
      cityExists.donation = donationExist;
      //  donationExist.city = cityExists
      //  return this.donationRepo.save(donationExist);
      return this.cityRepo.save(cityExists);
    } else {
      await this.donationRepo.save(donation_details);
      const donationExist: Donation[] = await this.donationRepo.find({
        where: {
          name: donation_details.name,
          DOB: donation_details.DOB,
          blood_group: donation_details.blood_group,
          contact : donation_details.contact,
          email : donation_details.email
        },
        relations: ['city'],
      });
      cityExists.donation = donationExist;
      return this.cityRepo.save(cityExists);
    }
  }

  //find the donations entry by applying filters from admin controller
  find(findAdminDto: FindAdminDto) {
    return this.donationRepo.find({
      // where: { city: findAdminDto.city, blood_group: findAdminDto.blood_group },
    });
  }

  //remove the donation from table  from admin controller
  remove(id: number) {
    return this.donationRepo.softDelete(id);
  }
}
