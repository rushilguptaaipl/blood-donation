import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { City } from "../entities/city.entity";
import { CreateCityDto } from "../dto/admin/createCity.dto";
import { DeleteCityDto } from "../dto/admin/deleteCity.dto";

@Injectable()
export class AdminCityService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) { }

    async adminCreateCity(createCityDto: CreateCityDto): Promise<City> {
        const isCityExists: City = await this.cityRepository.findOne({
            where: { city: createCityDto.city },
        });

        if (isCityExists) {
            throw new NotFoundException("City Already Exists")
        }

        return await this.cityRepository.save(createCityDto);
    }

    async adminListCity(): Promise<City[]> {
        const city:City[] = await this.cityRepository.find();
        if(!city.length){
            throw new NotFoundException("City Not Found")
        }
        return city;
    }

    async adminDeleteCity(deleteCityDto: DeleteCityDto) {
        const city = await this.cityRepository.findOne({where:{id:deleteCityDto.id}})
        if(!city){
            throw new NotFoundException("City Not Found")
        }
        return await this.cityRepository.softDelete(deleteCityDto.id);
    }


}