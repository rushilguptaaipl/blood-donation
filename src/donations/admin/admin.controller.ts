import { Body, Controller, Get, Post, Query, Render, UseGuards } from "@nestjs/common";
import { AdminDonationService } from "./admin.service";
import { AdminFilterDonationDto} from "../dto/admin/filterDonation.dto";
import { DeleteDonationDto } from "../dto/admin/deleteDonation.dto";
import { AdminUpdateDonationDto } from '../dto/admin/updateDonation.dto';
import { AdminGetDonationDto} from "../dto/admin/getDonation";
import { AuthGuard } from "src/user/guards/auth.guard";
import { AdminListDonationDto } from "@donations/dto/admin/listDonation.dto";

@Controller("admin")
// @UseGuards(AuthGuard)
export class AdminDonationContoller {
    constructor(private readonly adminDonationService: AdminDonationService) { }

    @Get('filterdonation')
    async adminFilterDonation(@Query() adminFilterDonationDto: AdminFilterDonationDto) {
        return await this.adminDonationService.adminFilterDonation(adminFilterDonationDto);
    }

    @Get('listdonation')
    async adminListDonation(@Query() adminListDonationDto : AdminListDonationDto) {
        return await this.adminDonationService.adminListDonation(adminListDonationDto);
    }

    @Post('deletedonation')
    async adminDeleteDonation(@Body() deleteDonationDto: DeleteDonationDto) {
        return this.adminDonationService.adminDeleteDonation(deleteDonationDto);
    }

    @Post('updatedonation')
    async adminUpdateDonation(@Body() adminUpdateDonationDto: AdminUpdateDonationDto) {
        return this.adminDonationService.adminUpdateDonation(adminUpdateDonationDto);
    }

    @Get('getDonation')
    async adminGetDonation(@Query() adminGetDonationDto:AdminGetDonationDto){
        return await this.adminDonationService.adminGetDonation(adminGetDonationDto)
}
}