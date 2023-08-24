import { Controller, Get, Post, Body, Render, Redirect } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/createCity.dto';
import { DeleteCityDto } from './dto/deleteCity.dto';

@Controller()
export class CityController {
  constructor(
  private readonly cityService : CityService
  ) {}
 
  @Post('addcity')
  @Redirect('list-city')
  adminCreateCity(@Body()createCityDto:CreateCityDto)
  {
    return this.cityService.adminCreateCity(createCityDto)
  }

  @Get("list-city")
  @Render("city")
  async adminListCity()
  {
    const citylist = await this.cityService.adminListCity()
    return {citylist}
  }

  @Post()
  adminDeleteCity(@Body() DeleteCityDto : DeleteCityDto )
  {
    return this.cityService.adminDeleteCity(DeleteCityDto)
  }

}
