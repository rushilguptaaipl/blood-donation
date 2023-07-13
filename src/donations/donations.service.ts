import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';
import { FindAdminDto } from 'src/admin/dto/find-admin.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepo: Repository<Donation>,
  ) {}

  // create the donation entry in the donation table
  create(createDonationDto: CreateDonationDto) {
    return this.donationRepo.save(createDonationDto);
  }

  //find the donations entry by applying filters from admin controller
  find(findAdminDto: FindAdminDto) {
    return this.donationRepo.find({
      where: { city: findAdminDto.city, blood_group: findAdminDto.blood_group },
    });
  }

  //remove the donation from table  from admin controller
  remove(id: number) {
    return this.donationRepo.softDelete(id);
  }
}
