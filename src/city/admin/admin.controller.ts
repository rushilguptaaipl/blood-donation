import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { AdminCityService } from './admin.service';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CreateCityDto } from '../dto/admin/createCity.dto';
import { DeleteCityDto } from '../dto/admin/deleteCity.dto';
import { ListCityDto } from '../dto/admin/listCity.dto';
import { GetCityDto } from '@city/dto/admin/getCity.dto';
import { UpdateCityDto } from '@city/dto/admin/updateCity.dto';

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminCityController {
  constructor(private readonly AdminCityService: AdminCityService) {}

  @Post('addcity')
  adminCreateCity(@Body() createCityDto: CreateCityDto) {
    return this.AdminCityService.adminCreateCity(createCityDto);
  }

  @Get('listcity')
  async adminListCity(@Query() listCityDto: ListCityDto) {
    return await this.AdminCityService.adminListCity(listCityDto);
  }

  @Post('deletecity')
  adminDeleteCity(@Body() deleteCityDto: DeleteCityDto) {
    return this.AdminCityService.adminDeleteCity(deleteCityDto);
  }

  @Post('updatecity')
  adminUpdateCity(@Body() updateCityDto: UpdateCityDto) {
    return this.AdminCityService.adminUpdateCity(updateCityDto);
  }

  @Get('getcity')
  admingetCity(@Query() getCityDto: GetCityDto) {
    return this.AdminCityService.adminGetCity(getCityDto);
  }
}
