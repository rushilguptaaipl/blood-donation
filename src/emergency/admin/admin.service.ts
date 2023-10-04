import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

import { Emergency } from "../entities/emergency.entity";
import { DeleteEmergencyDto } from "../dto/admin/delete-emergency.dto";

@Injectable()
export class AdminEmergencyService {
    constructor(
        @InjectRepository(Emergency)
        private readonly emergencyRepository: Repository<Emergency>,
    ) { }

    async adminListEmergency(): Promise<Emergency[]> {
        const emergency: Emergency[] = await this.emergencyRepository.find({ relations: { city: true }, order: { createdAt: "DESC" } });
        if (!emergency.length) {
            throw new NotFoundException("Emergency Not Found")
        }
        return emergency;
    }

    async adminDeleteEmergency(deleteEmergencyDto: DeleteEmergencyDto):Promise<any> {
        const emergency = await this.emergencyRepository.findOne({ where: { id: deleteEmergencyDto.id } })
        if (!emergency) {
            throw new NotFoundException("Emergency Not Found")
        }
        return this.emergencyRepository.softDelete(deleteEmergencyDto.id)
    }
}