import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { FindAdminDto } from './dto/find-admin.dto';
import { DonationsService } from 'src/donations/donations.service';

@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly donationsService: DonationsService,
  ) {}

  @Post("/search")
  @Render('admin')
  async find(@Body() test) {
    const data = await this.adminService.find(test);
    const cityList = await this.adminService.cityList()
    return {data,cityList};
  }

  @Get("admin")
  @Render('admin')
  async findAll() {
    const data = await this.adminService.findAll();
    return {data};
  }

 
}
