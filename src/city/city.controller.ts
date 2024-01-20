import { Controller, Get, Post, Body, Render, Redirect, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/admin/createCity.dto';
import { DeleteCityDto } from './dto/admin/deleteCity.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Controller()
export class CityController {}
