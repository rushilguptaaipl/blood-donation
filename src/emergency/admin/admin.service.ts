import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

import { Emergency } from '../entities/emergency.entity';
import { DeleteEmergencyDto } from "../dto/admin/delete-emergency.dto";
import { AdminChangeStatusDto } from "../dto/admin/change-status.dto";
import { BooleanMessage } from "src/user/interface/booleanMessage.interface";
import { ListEmergencyDto } from "@emergency/dto/admin/list-emergency.dto";

@Injectable()
export class AdminEmergencyService {
    constructor(
        @InjectRepository(Emergency)
        private readonly emergencyRepository: Repository<Emergency>,
    ) { }

    /**
     * List Emergency
     * @returns 
     */
    async adminListEmergency(listEmergencyDto : ListEmergencyDto): Promise<Object> {
        const [emergency , count]: [Emergency[] , number] = await this.emergencyRepository.findAndCount({ relations: { city: true }, order: { createdAt: "DESC" } , skip:listEmergencyDto.skip , take:listEmergencyDto.take});
        if (!emergency.length) {
            throw new NotFoundException("Emergency Not Found")
        }
        return {emergency : emergency , count : count};
    }

    /**
     * Delete Emergency
     * @param deleteEmergencyDto 
     * @returns 
     */
    async adminDeleteEmergency(deleteEmergencyDto: DeleteEmergencyDto):Promise<BooleanMessage> {
        const emergency = await this.emergencyRepository.findOne({ where: { id: deleteEmergencyDto.id } })
        if (!emergency) {
            throw new NotFoundException("Emergency Not Found")
        }
        await this.emergencyRepository.softDelete(deleteEmergencyDto.id)

        return {
            success : true ,
            message : "Emergency Deleted Successfully"
        }
    }

    /**
     * Change status of Emergency
     * @param changeStatusDto 
     * @returns 
     */
    async adminChangeStatus(changeStatusDto : AdminChangeStatusDto):Promise<BooleanMessage>{
        const emergency:Emergency = await this.emergencyRepository.findOne({ where: { id: changeStatusDto.id } })
        if (!emergency) {
            throw new NotFoundException("Emergency Not Found")
        }   
        if(emergency.status == false){
            emergency.status = true
        }
       else{
        emergency.status = false
       }
         await this.emergencyRepository.update(emergency.id , emergency)

         return {
            success : true ,
            message : " Status Updated Successfully"
        }
    }
}