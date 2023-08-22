import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/createCity.dto';
import { DeleteCityDto } from './dto/deleteCity.dto';

@Controller()
export class CityController {
  constructor(
  private readonly cityService : CityService
  ) {}
 
  @Post()
  adminCreateCity(@Body()createCityDto:CreateCityDto)
  {
    return this.cityService.adminCreateCity(createCityDto)
  }

  @Get("list-city")
  adminListCity()
  {
    return this.cityService.adminListCity()
  }

  @Post()
  adminDeleteCity(@Body() DeleteCityDto : DeleteCityDto )
  {
    return this.cityService.adminDeleteCity(DeleteCityDto)
  }

}
