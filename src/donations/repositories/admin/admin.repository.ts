import { City } from "@city/entities/city.entity";
import { AdminListDonationDto } from "@donations/dto/admin/listDonation.dto";
import { Donation } from "@donations/entities/donation.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nService } from "nestjs-i18n";
import { Brackets, Repository } from "typeorm";

@Injectable()
export class AdminDonationRepository {

    constructor(@InjectRepository(Donation)
    private donationRepo: Repository<Donation>,
    ) { }


    async adminListDonation(adminListDonationDto: AdminListDonationDto): Promise<{ donation: Donation[], count: number }> {
        const [donation, count]: [Donation[], number] = await this.donationRepo.createQueryBuilder("donation")
            .leftJoinAndSelect("donation.city", "city")
            .where(new Brackets(qb => {
                if (adminListDonationDto.city && adminListDonationDto.blood_group) {
                    qb.where("donation.blood_group = :bloodGroup", { bloodGroup: adminListDonationDto.blood_group })
                        .andWhere("city.city = :cityName", { cityName: adminListDonationDto.city })
                }
            }))
            .getManyAndCount()

        return { donation: donation, count: count };
    }

}