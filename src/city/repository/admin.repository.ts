import { ListCityDto } from '@city/dto/admin/listCity.dto';
import { City } from '@city/entities/city.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class AdminCityRepository {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  /**
   * 
   * @param listCityDto 
   * @returns 
   */
  async adminListCity(listCityDto: ListCityDto) {
    const [city , count] :[City [] , number] = await this.cityRepository.createQueryBuilder('city')
    .andWhere(new Brackets(qb =>{
        listCityDto.search === null ? isEmpty : 
        qb.where("LOWER(city.city) LIKE :city" , {city : `%${listCityDto.search.toLowerCase()}%`})
    }))
    .take(listCityDto.take)
    .skip(listCityDto.skip)
    .getManyAndCount()
    return {city : city , count : count}
  }
}
