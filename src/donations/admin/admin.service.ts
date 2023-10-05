import { Injectable, NotFoundException } from "@nestjs/common";
import { Donation } from "../entities/donation.entity";
import { AdminFindDonationDto } from "../dto/admin/findDonation.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteDonationDto } from "../dto/admin/deleteDonation.dto";
import { AdminUpdateDonationDto } from "../dto/admin/updateDonation.dto";
import { City } from "src/city/entities/city.entity";
import { FindDonationbyIdDto } from "../dto/admin/findDonationById.dto";

@Injectable()
export class AdminDonationService {

    constructor(@InjectRepository(Donation)
    private donationRepo: Repository<Donation>,
    @InjectRepository(City)
    private readonly cityRepo : Repository<City>
    ) { }

    async adminFindDonation(adminFindDonationDto: AdminFindDonationDto,): Promise<Donation[]> {
        const donation: Donation[] = await this.donationRepo.find({
            where: { blood_group: adminFindDonationDto.blood_group, city: { city: adminFindDonationDto.city } },
            relations: { city: true },
        });
        if (!donation.length) {
            throw new NotFoundException("Donation Not Found")
        }
        return donation;
    }

    async adminListDonation(): Promise<Donation[]> {
        const donation: Donation[] = await this.donationRepo.find({ relations: { city: true } });
        if (!donation.length) {
            throw new NotFoundException("Donation Not Found")
        }
        return donation;
    }

    async adminDeleteDonation(deleteDonationDto: DeleteDonationDto) {
        const donation: Donation = await this.donationRepo.findOne({
            where: { id: deleteDonationDto.id },
        });

        if (!donation) {
            throw new NotFoundException("Donation Not Found")
        }
        return await this.donationRepo.softDelete(deleteDonationDto.id);
    }

    async adminUpdateDonation(adminUpdateDonationDto: AdminUpdateDonationDto):Promise<any> {
        const donation: Donation = await this.donationRepo.findOne({
            where: { id: adminUpdateDonationDto.id },
            relations: { city: true },
        });

        if (!donation) {
            throw new NotFoundException("Donation Not Found")
        }

        const updatedDonation = new Donation();
        updatedDonation.name = adminUpdateDonationDto?.name;
        updatedDonation.blood_group = adminUpdateDonationDto?.blood_group;
        updatedDonation.contact = adminUpdateDonationDto?.contact;
        updatedDonation.disease = adminUpdateDonationDto?.disease;
        updatedDonation.email = adminUpdateDonationDto?.email;
        updatedDonation.gender = adminUpdateDonationDto?.gender;
        updatedDonation.DOB = adminUpdateDonationDto?.DOB;



        if (adminUpdateDonationDto?.city) {
            var cityExists:City = await this.cityRepo.findOne({ where: { city: adminUpdateDonationDto.city } });
            if (!cityExists) {
                const city  = new City()
                city.city = adminUpdateDonationDto.city
                city.createdAt = new Date(Date.now())
                city.updatedAt = new Date(Date.now())
                cityExists = await this.cityRepo.save(city);
            }
            updatedDonation.city = cityExists;
        }

        const result  = await this.donationRepo.update(adminUpdateDonationDto.id,updatedDonation,);
        return result;
    }

    async adminFindDonationById(findDonationbyIdDto:FindDonationbyIdDto):Promise<Donation>{
        const donation = await this.donationRepo.findOne({where:{id:findDonationbyIdDto.id},relations:{city:true}});
        if(!donation){
            throw new NotFoundException("Donation Not Found")
        }
        return donation;
    }
}