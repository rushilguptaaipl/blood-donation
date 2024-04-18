import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { AdminCityController } from './admin/admin.controller';
import { AdminCityService } from './admin/admin.service';
import { Roles } from 'src/roles/entities/roles.entity';
import { AdminCityRepository } from './repository/admin.repository';


@Module({
  imports:[TypeOrmModule.forFeature([City,Roles])],
  controllers: [CityController,AdminCityController],
  providers: [CityService,AdminCityService,AdminCityRepository]
})
export class CityModule {}
