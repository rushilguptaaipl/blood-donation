import { Injectable } from '@nestjs/common';
import { FindAdminDto } from './dto/find-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/donations/entities/donation.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AdminService {
  constructor( @InjectRepository(Donation)
  private donationRepo: Repository<Donation> ){}
  create(createAdminDto: FindAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return this.donationRepo.find()
  }

  async find(data) {
  return await this.donationRepo.find({where:{city : data.city , blood_group:data.blood_group}})
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
