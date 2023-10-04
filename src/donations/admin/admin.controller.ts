import { Body, Controller, Get, Post, Query, Render } from "@nestjs/common";
import { AdminDonationService } from "./admin.service";
import { AdminFindDonationDto } from "../dto/admin/findDonation.dto";
import { DeleteDonationDto } from "../dto/admin/deleteDonation.dto";
import { AdminUpdateDonationDto } from '../dto/admin/updateDonation.dto';
import { FindDonationbyIdDto } from "../dto/admin/findDonationById.dto";

@Controller("admin")
export class AdminDonationContoller {
    constructor(private readonly adminDonationService: AdminDonationService) { }

    @Post('finddonation')
    async adminfindDonation(@Body() adminFindDonationDto: AdminFindDonationDto) {
        return await this.adminDonationService.adminFindDonation(adminFindDonationDto);
    }

    @Get('listdonation')
    async adminListDonation() {
        return await this.adminDonationService.adminListDonation();
    }

    @Post('deletedonation')
    async adminDeleteDonation(@Body() deleteDonationDto: DeleteDonationDto) {
        return this.adminDonationService.adminDeleteDonation(deleteDonationDto);
    }

    @Post('updatedonation')
    async adminUpdateDonation(@Body() adminUpdateDonationDto: AdminUpdateDonationDto) {
        return this.adminDonationService.adminUpdateDonation(adminUpdateDonationDto);
    }

    @Post('findDonationById')
    async adminFindDonationById(@Body() findDonationbyIdDto:FindDonationbyIdDto){
        return await this.adminDonationService.adminFindDonationById(findDonationbyIdDto)
}
}