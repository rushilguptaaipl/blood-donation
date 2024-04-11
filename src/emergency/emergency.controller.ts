import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';


@Controller()
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  @Post("createEmergency")
  createEmergency(@Body() createEmergencyDto: CreateEmergencyDto) {
    return this.emergencyService.createEmergency(createEmergencyDto);
  }
}
