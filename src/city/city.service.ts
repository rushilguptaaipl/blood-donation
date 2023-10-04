import { Injectable, UnauthorizedException } from '@nestjs/common';
import { City } from './entity/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/admin/createCity.dto';
import { DeleteCityDto } from './dto/admin/deleteCity.dto';

@Injectable()
export class CityService {
  // constructor(
  //   @InjectRepository(City)
  //   private cityRepository: Repository<City>,
  // ) {}
  // async adminCreateCity (createCityDto: CreateCityDto) : Promise<City>  {
  //   const isCityExists: City[] = await this.cityRepository.find({
  //     where: { city: createCityDto.city },
  //   });

  //   if (isCityExists.length) {
  //     throw new UnauthorizedException('city already exists');
  //   }

  //   return await this.cityRepository.save(createCityDto);
  // }

  // async adminListCity(): Promise<City[]> {
  //   return this.cityRepository.find();
  // }

  // async adminDeleteCity(DeleteCityDto : DeleteCityDto){
  //   return this.cityRepository.softDelete(DeleteCityDto.id);
  // }
}
