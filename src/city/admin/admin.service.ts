import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { CreateCityDto } from '../dto/admin/createCity.dto';
import { DeleteCityDto } from '../dto/admin/deleteCity.dto';
import { ListCityDto } from '../dto/admin/listCity.dto';
import { BooleanMessage } from 'src/user/interface/booleanMessage.interface';

@Injectable()
export class AdminCityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  /**
   * Create City
   * @param createCityDto
   * @returns
   */
  async adminCreateCity(createCityDto: CreateCityDto): Promise<BooleanMessage> {
    const isCityExists: City = await this.cityRepository.findOne({
      where: { city: createCityDto.city },
    });

    if (isCityExists) {
      throw new NotFoundException('City Already Exists');
    }

    await this.cityRepository.save(createCityDto);

    return {
      success: true,
      message: 'City Added Successfully',
    };
  }

  /**
   * List cities
   * @param listCityDto
   * @returns
   */
  async adminListCity(listCityDto: ListCityDto): Promise<Object> {
    const [city, count]: [City[], number] =
      await this.cityRepository.findAndCount({
        take: listCityDto.take,
        skip: listCityDto.skip,
        order:{createdAt:"DESC"}
      });
    if (!city.length) {
      throw new NotFoundException('City Not Found');
    }
    return { city: city, count: count };
  }

  /**
   * Deletes City
   * @param deleteCityDto
   * @returns
   */
  async adminDeleteCity(deleteCityDto: DeleteCityDto) :Promise<BooleanMessage> {
    const city = await this.cityRepository.findOne({
      where: { id: deleteCityDto.id },
    });
    if (!city) {
      throw new NotFoundException('City Not Found');
    }
    await this.cityRepository.softDelete(deleteCityDto.id);

    return {
      success: true,
      message: 'City deleted Successfully',
    };
  }
}
