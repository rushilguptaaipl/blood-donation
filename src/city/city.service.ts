import { Injectable, UnauthorizedException } from '@nestjs/common';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/admin/createCity.dto';
import { DeleteCityDto } from './dto/admin/deleteCity.dto';

@Injectable()
export class CityService {}
