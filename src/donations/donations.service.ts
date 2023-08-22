import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';
import { FindAdminDto } from 'src/admin/dto/find-admin.dto';
import { City } from 'src/city/entity/city.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepo: Repository<Donation>,
    @InjectRepository(City)
    private cityRepo: Repository<City>,
  ) {}

  // create the donation entry in the donation table
  async create(createDonationDto: CreateDonationDto) : Promise<Donation> {
    const { city, ...donation_details } = createDonationDto;

    let donationExist: Donation = await this.donationRepo.findOne({
      where: {
        name: donation_details.name,
        DOB: donation_details.DOB,
        blood_group: donation_details.blood_group,
        contact: donation_details.contact,
        email: donation_details.email,
      },
      relations: ['city'],
    });

    if (donationExist) {
      throw new ConflictException('user already exists');
    }

   donationExist =  await this.donationRepo.save(donation_details)

    var cityExists: City = await this.cityRepo.findOne({
      where: { city: city },
      relations: ['donation'],
    });

    if(!cityExists)
    {
       cityExists  = await this.cityRepo.save({city})
    }

    donationExist.city = cityExists;

    return await this.donationRepo.save(donationExist);
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
