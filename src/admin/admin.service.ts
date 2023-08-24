import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/donations/entities/donation.entity';
import { Repository } from 'typeorm';
import { City } from 'src/city/entity/city.entity';
import { AdminFindDonationDto } from './dto/findDonation.dto';
import { Emergency } from 'src/emergency/entities/emergency.entity';
import { deleteDonation } from './dto/delete-donation.dto';
import { AdminUpdateDonationDto } from './dto/updateDonation.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Donation)
    private donationRepo: Repository<Donation>,
    @InjectRepository(Emergency)
    private readonly emergencyRepository: Repository<Emergency>,
    @InjectRepository(City)
    private cityRepo: Repository<City>,
  ) {}

  findAll(): Promise<Donation[]> {
    return this.donationRepo.find({ relations: { city: true } });
  }

  async adminFindDonation(
    adminFindDonationDto: AdminFindDonationDto,
  ): Promise<Donation[]> {
    const { city, blood_group } = adminFindDonationDto;
    const donation: Donation[] = await this.donationRepo.find({
      where: { blood_group: blood_group },
      relations: { city: true },
    });
    const filteredDonation = await donation.filter((item) => {
      return item.city.city == city;
    });
    return filteredDonation;
  }

  async searchCityList(): Promise<City[]> {
    const cityList = await this.cityRepo.find();
    return cityList;
  }

  async findAllEmergency(): Promise<Emergency[]> {
    return await this.emergencyRepository.find({ relations: { city: true } });
  }

  async adminDeleteDonation(id:number) {
    const donation: Donation = await this.donationRepo.findOne({
      where: { id: id },
    });

    if (!donation) {
      throw new UnauthorizedException('user not found');
    }
    return await this.donationRepo.softDelete(id);
  }

  async adminUpdateDonation(adminUpdateDonationDto: AdminUpdateDonationDto , id:number) {
    const donation: Donation = await this.donationRepo.findOne({
      where: { id: id },
      relations: { city: true },
    });

    if (!donation) {
      throw new UnauthorizedException('user not found');
    }

    const updatedDonation = new Donation();
    updatedDonation.name = adminUpdateDonationDto.name;
    updatedDonation.blood_group = adminUpdateDonationDto.blood_group;
    updatedDonation.contact = adminUpdateDonationDto.contact;
    updatedDonation.disease = adminUpdateDonationDto.disease;
    updatedDonation.email = adminUpdateDonationDto.email;
    updatedDonation.gender = adminUpdateDonationDto.gender;
    updatedDonation.DOB = adminUpdateDonationDto.DOB;

    var { city } = adminUpdateDonationDto;

    if (city) {
      var cityExists = await this.cityRepo.findOne({ where: { city: city } });
      if (!cityExists) {
        cityExists = await this.cityRepo.save({ city });
      }
      updatedDonation.city = cityExists;
    }

    return await this.donationRepo.update(
      id,
      updatedDonation,
    );
  }

  async adminDeleteEmergency(id:number){
    const emergency = await this.emergencyRepository.findOne({where:{id:id}})
    if(!emergency)
    {
      throw new UnauthorizedException("emergency not found")
    }
    return this.emergencyRepository.softDelete(id)
  }

 async showPreviousValuesUpdate(id : number){
  let donation = await this.donationRepo.findOne({where:{id : id}, relations:{city:true}})
  if(!donation)
  {
    throw new UnauthorizedException("donation not found")
  }
  return donation;
 }
}
