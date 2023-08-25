import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';


@Controller()
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  @Post("submit-emergency-form")
  @Render('successEmergency')
  create(@Body() createEmergencyDto: CreateEmergencyDto) {
    return this.emergencyService.create(createEmergencyDto);
  }

  @Get("emergency")
  @Render('emergency')
  getEmergency() {}




}
