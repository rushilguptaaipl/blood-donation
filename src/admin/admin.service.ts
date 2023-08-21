import { Injectable } from '@nestjs/common';
import { FindAdminDto } from './dto/find-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/donations/entities/donation.entity';
import { Repository } from 'typeorm';
import { City } from 'src/donations/entities/city.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Donation)
    private donationRepo: Repository<Donation>,
    @InjectRepository(City)
    private cityRepo: Repository<City>,
  ) {}
  create(createAdminDto: FindAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return this.donationRepo.find({ relations: { city: true } });
  }

  async find(data) {
    const { city, blood_group } = data;
    const donation = await this.donationRepo.find({
      where: { blood_group: blood_group },
      relations: { city: true },
    });
    const tester = await donation.filter((item) => {
      return item.city.city === city;
    });
    return tester;
  }

  async cityList() {
    const test = await this.cityRepo.find();

    return test;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
