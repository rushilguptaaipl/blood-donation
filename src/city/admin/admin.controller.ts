import { Body, Controller, Get, Post, Query, Redirect, UseGuards } from "@nestjs/common";
import { AdminCityService } from "./admin.service";
import { AuthGuard } from "src/user/guards/auth.guard";
import { CreateCityDto } from "../dto/admin/createCity.dto";
import { DeleteCityDto } from "../dto/admin/deleteCity.dto";
import { ListCityDto } from "../dto/admin/listCity.dto";

@Controller("admin")
@UseGuards(AuthGuard)
export class AdminCityController {
  constructor(private readonly AdminCityService: AdminCityService) { }
  
  @Post('addcity')
  adminCreateCity(@Body() createCityDto: CreateCityDto) {
    return this.AdminCityService.adminCreateCity(createCityDto)
  }

  @Get("listcity")
  async adminListCity(@Query() listCityDto : ListCityDto) {
    console.log(listCityDto);
    return await this.AdminCityService.adminListCity(listCityDto) 
  }


  @Post("deletecity")
  adminDeleteCity(@Body() deleteCityDto: DeleteCityDto) {
    return this.AdminCityService.adminDeleteCity(deleteCityDto)
  }

}