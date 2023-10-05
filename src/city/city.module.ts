import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { AdminCityController } from './admin/admin.controller';
import { AdminCityService } from './admin/admin.service';


@Module({
  imports:[TypeOrmModule.forFeature([City])],
  controllers: [CityController,AdminCityController],
  providers: [CityService,AdminCityService]
})
export class CityModule {}
