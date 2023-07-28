import { Injectable } from '@nestjs/common';
import { FindAdminDto } from './dto/find-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/donations/entities/donation.entity';
import { Repository } from 'typeorm';
import { City } from 'src/donations/entities/city.entity';


@Injectable()
export class AdminService {
  constructor( @InjectRepository(Donation)
  private donationRepo: Repository<Donation> ,
  @InjectRepository(City)
  private cityRepo: Repository<City>){}
  create(createAdminDto: FindAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return this.donationRepo.find()
  }

  async find(data) {
   const  {city , blood_group} = data
  const test =  await this.cityRepo.findOne({where:{ city : city}, relations : {donation : true}})
 const  test2 = test.donation
 const test3 =  test2.filter((data)=>{
   return data.blood_group === "B+"
  
 })
  return test3;
  }

  async cityList(){
    const test = await this.cityRepo.find()
    return test;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
