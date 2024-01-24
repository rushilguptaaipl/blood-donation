import { Injectable, NotFoundException } from "@nestjs/common";
import { Donation } from "../entities/donation.entity";
import { AdminFilterDonationDto} from "../dto/admin/filterDonation.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteDonationDto } from "../dto/admin/deleteDonation.dto";
import { AdminUpdateDonationDto } from "../dto/admin/updateDonation.dto";
import { City } from "src/city/entities/city.entity";
import { AdminGetDonationDto} from "../dto/admin/getDonation";
import { BooleanMessage } from "src/user/interface/booleanMessage.interface";
import { AdminListDonationDto } from "@donations/dto/admin/listDonation.dto";
import { I18nService } from "nestjs-i18n";

@Injectable()
export class AdminDonationService {

    constructor(@InjectRepository(Donation)
    private donationRepo: Repository<Donation>,
    @InjectRepository(City)
    private readonly cityRepo : Repository<City>,
    private readonly i18n : I18nService
    ) { }

    /**
     * Filter Donation
     * @param adminFindDonationDto 
     * @returns 
     */
    async adminFilterDonation(adminFilterDonationDto: AdminFilterDonationDto): Promise<Object> {
        const [donation , count]: [Donation[] , number] = await this.donationRepo.findAndCount({
            where: { blood_group: adminFilterDonationDto.blood_group, city: { city: adminFilterDonationDto.city } },
            relations: { city: true }, take :adminFilterDonationDto.take , skip : adminFilterDonationDto.skip
        });
        if (!donation.length) {
            throw new NotFoundException(this.i18n.t("donation.DONATION_NOT_FOUND"))
        }
        return {donation : donation , count : count};
    }

    /**
     * List all Donations
     * @param adminListDonationDto 
     * @returns 
     */
    async adminListDonation(adminListDonationDto : AdminListDonationDto): Promise<Object> {
        const [donation , count] : [Donation[] , number] = await this.donationRepo.findAndCount({ relations: { city: true }  , take: adminListDonationDto.take , skip : adminListDonationDto.skip});        
        if (!donation.length) {
            throw new NotFoundException(this.i18n.t("donation.DONATION_NOT_FOUND"))
        }
        return {donation : donation , count : count};
    }

    /**
     * Delete Donation
     * @param deleteDonationDto 
     * @returns 
     */
    async adminDeleteDonation(deleteDonationDto: DeleteDonationDto):Promise<BooleanMessage> {
        const donation: Donation = await this.donationRepo.findOne({
            where: { id: deleteDonationDto.id },
        });

        if (!donation) {
            throw new NotFoundException("Donation Not Found")
        }
         await this.donationRepo.softDelete(deleteDonationDto.id);
         return {
            success : true ,
            message : this.i18n.t("donation.DONAR_DELETED_SUCCESSFULLY")
         }
    }

    /**
     * Update Donar Information
     * @param adminUpdateDonationDto 
     * @returns 
     */
    async adminUpdateDonation(adminUpdateDonationDto: AdminUpdateDonationDto):Promise<BooleanMessage> {
        const donation: Donation = await this.donationRepo.findOne({
            where: { id: adminUpdateDonationDto.id },
            relations: { city: true },
        });

        if (!donation) {
            throw new NotFoundException(this.i18n.t("donation.DONATION_NOT_FOUND"))
        }

        const updateDonation = new Donation();
        updateDonation.name = adminUpdateDonationDto?.name;
        updateDonation.blood_group = adminUpdateDonationDto?.blood_group;
        updateDonation.contact = adminUpdateDonationDto?.contact;
        updateDonation.disease = adminUpdateDonationDto?.disease;
        updateDonation.email = adminUpdateDonationDto?.email;
        updateDonation.gender = adminUpdateDonationDto?.gender;
        updateDonation.DOB = adminUpdateDonationDto?.DOB;

        if (adminUpdateDonationDto?.city) {
            let isCityExists : City = await this.cityRepo.findOne({ where: { city: adminUpdateDonationDto.city } });
            if (!isCityExists) {
                const city  = new City()
                city.city = adminUpdateDonationDto.city
                city.createdAt = new Date(Date.now())
                city.updatedAt = new Date(Date.now())
                isCityExists = await this.cityRepo.save(city);
            }
            updateDonation.city = isCityExists;
        }

         await this.donationRepo.update(adminUpdateDonationDto.id,updateDonation);

         return {
            success : true ,
            message : this.i18n.t("donation.DONAR_UPDATED_SUCCESSFULLY")
         }
    }

    /**
     * Get Donation
     * @param adminGetDonationDto 
     * @returns 
     */
    async adminGetDonation(adminGetDonationDto:AdminGetDonationDto):Promise<Donation>{
        const donation = await this.donationRepo.findOne({where:{id:adminGetDonationDto.id},relations:{city:true}});
        if(!donation){
            throw new NotFoundException(this.i18n.t("donation.DONATION_NOT_FOUND"))
        }
        return donation;
    }
}