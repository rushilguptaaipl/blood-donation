import { Body, Controller, Get, Post, Redirect, UseGuards } from "@nestjs/common";
import { AdminCityService } from "./admin.service";
import { AuthGuard } from "src/user/guards/auth.guard";
import { CreateCityDto } from "../dto/admin/createCity.dto";
import { DeleteCityDto } from "../dto/admin/deleteCity.dto";

@Controller("admin")
@UseGuards(AuthGuard)
export class AdminCityController {
  constructor(private readonly AdminCityService: AdminCityService) { }
  @Post('addcity')
  adminCreateCity(@Body() createCityDto: CreateCityDto) {
    return this.AdminCityService.adminCreateCity(createCityDto)
  }

  @Get("listcity")
  async adminListCity() {
    const citylist = await this.AdminCityService.adminListCity()
    return citylist 
  }

  @Post("deletecity")
  adminDeleteCity(@Body() deleteCityDto: DeleteCityDto) {
    return this.AdminCityService.adminDeleteCity(deleteCityDto)
  }

}