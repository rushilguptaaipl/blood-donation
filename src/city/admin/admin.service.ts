import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { CreateCityDto } from '../dto/admin/createCity.dto';
import { DeleteCityDto } from '../dto/admin/deleteCity.dto';
import { ListCityDto } from '../dto/admin/listCity.dto';
import { BooleanMessage } from 'src/user/interface/booleanMessage.interface';

import { GetCityDto } from '@city/dto/admin/getCity.dto';
import { UpdateCityDto } from '@city/dto/admin/updateCity.dto';
import { I18nService } from 'nestjs-i18n';
import { AdminCityRepository } from '@city/repository/admin.repository';

@Injectable()
export class AdminCityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    private readonly i18n: I18nService,
    private readonly _cityRepository: AdminCityRepository,
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
      throw new NotFoundException(this.i18n.t('city.CITY_ALREADY_EXISTS'));
    }

    await this.cityRepository.save(createCityDto);

    return {
      success: true,
      message: this.i18n.t('city.CITY_ADDED_SUCCESSFULLY'),
    };
  }

  /**
   * List cities
   * @param listCityDto
   * @returns
   */
  async adminListCity(
    listCityDto: ListCityDto,
  ): Promise<{ city: City[]; count: number }> {
    const city = await this._cityRepository.adminListCity(listCityDto);
    if (!city.city.length) {
      throw new NotFoundException(this.i18n.t('city.CITY_NOT_FOUND'));
    }
    return city;
  }

  /**
   * Deletes City
   * @param deleteCityDto
   * @returns
   */
  async adminDeleteCity(deleteCityDto: DeleteCityDto): Promise<BooleanMessage> {
    const city = await this.cityRepository.findOne({
      where: { id: deleteCityDto.id },
    });
    if (!city) {
      throw new NotFoundException(this.i18n.t('city.CITY_NOT_FOUND'));
    }
    await this.cityRepository.softDelete(deleteCityDto.id);

    return {
      success: true,
      message: this.i18n.t('city.CITY_DELETED_SUCCESSFULLY'),
    };
  }

  /**
   * update city name
   * @param updateCityDto
   * @returns
   */
  async adminUpdateCity(updateCityDto: UpdateCityDto): Promise<BooleanMessage> {
    const isCityExists = await this.cityRepository.findOne({
      where: { city: updateCityDto.city },
    });

    if (isCityExists) {
      throw new BadRequestException(this.i18n.t('city.CITY_ALREADY_EXISTS'));
    }

    const city = await this.cityRepository.findOne({
      where: { id: updateCityDto.id },
    });
    if (!city) {
      throw new NotFoundException(this.i18n.t('city.CITY_NOT_FOUND'));
    }

    city.city = updateCityDto.city;

    await this.cityRepository.update(city.id, city);

    return {
      success: true,
      message: this.i18n.t('city.CITY_UPDATED_SUCCESSFULLY'),
    };
  }

  /**
   * get city
   * @param getCityDto
   * @returns
   */
  async adminGetCity(getCityDto: GetCityDto): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id: getCityDto.id },
    });

    if (!city) {
      throw new NotFoundException(this.i18n.t('city.CITY_NOT_FOUND'));
    }

    return city;
  }
}
