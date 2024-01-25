import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

import { Emergency } from '../entities/emergency.entity';
import { DeleteEmergencyDto } from "../dto/admin/delete-emergency.dto";
import { AdminChangeStatusDto } from "../dto/admin/change-status.dto";
import { BooleanMessage } from "src/user/interface/booleanMessage.interface";
import { ListEmergencyDto } from "@emergency/dto/admin/list-emergency.dto";
import { I18nService } from "nestjs-i18n";
import { Donation } from "@donations/entities/donation.entity";
import { MailService } from "@emergency/mail.service";

@Injectable()
export class AdminEmergencyService {
    constructor(
        @InjectRepository(Emergency)
        private readonly emergencyRepository: Repository<Emergency>,
        @InjectRepository(Donation)
        private readonly donationRepository: Repository<Donation>,
        private readonly i18n: I18nService,
        private readonly mailService: MailService
    ) { }

    /**
     * List Emergency
     * @returns 
     */
    async adminListEmergency(listEmergencyDto: ListEmergencyDto): Promise<Object> {
        const [emergency, count]: [Emergency[], number] = await this.emergencyRepository.findAndCount({ relations: { city: true }, order: { createdAt: "DESC" }, skip: listEmergencyDto.skip, take: listEmergencyDto.take });
        if (!emergency.length) {
            throw new NotFoundException(this.i18n.t("emergency.EMERGENCY_NOT_FOUND"))
        }
        return { emergency: emergency, count: count };
    }

    /**
     * Delete Emergency
     * @param deleteEmergencyDto 
     * @returns 
     */
    async adminDeleteEmergency(deleteEmergencyDto: DeleteEmergencyDto): Promise<BooleanMessage> {
        const emergency = await this.emergencyRepository.findOne({ where: { id: deleteEmergencyDto.id } })
        if (!emergency) {
            throw new NotFoundException(this.i18n.t("emergency.EMERGENCY_NOT_FOUND"))
        }
        await this.emergencyRepository.softDelete(deleteEmergencyDto.id)

        return {
            success: true,
            message: this.i18n.t("emergency.EMERGENCY_DELETED_SUCCESSFULLY")
        }
    }

    /**
     * Change status of Emergency
     * @param changeStatusDto 
     * @returns 
     */
    async adminChangeStatus(changeStatusDto: AdminChangeStatusDto): Promise<BooleanMessage> {
        const emergency: Emergency = await this.emergencyRepository.findOne({ where: { id: changeStatusDto.id }, relations: { city: true } })
        if (!emergency) {
            throw new NotFoundException(this.i18n.t("emergency.EMERGENCY_NOT_FOUND"))
        }

        const donations = await this.donationRepository.find({ where: { blood_group: emergency.blood_group, city: { city: emergency.city.city } }, relations: { city: true } })

        try {
            if(emergency.status == false){
                await this.mailService.sendDonations(donations, emergency)
            }
            emergency.status = true
        }
        catch (error) {
            console.log("UNABLE TO SEND EMAIL");
        }

        await this.emergencyRepository.update(emergency.id, emergency)

        return {
            success: true,
            message: this.i18n.t("emergency.EMERGENCY_UPDATED_SUCCESSFULLY")
        }
    }
}