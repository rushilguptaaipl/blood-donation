import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AdminEmergencyService } from "./admin.service";
import { DeleteEmergencyDto } from "../dto/admin/delete-emergency.dto";
import { AdminChangeStatusDto } from "../dto/admin/change-status.dto";
import { AuthGuard } from "src/user/guards/auth.guard";

@Controller("admin")
@UseGuards(AuthGuard)
export class AdminEmergencyController {
    constructor(private readonly adminEmergencyService: AdminEmergencyService) { }

    @Get('listemergency')
    async adminListEmergency() {
        return await this.adminEmergencyService.adminListEmergency();
    }

    @Post('deleteemergency')
    async adminDeleteEmergency(@Body() deleteEmergencyDto: DeleteEmergencyDto) {
        return await this.adminEmergencyService.adminDeleteEmergency(deleteEmergencyDto);
    }

    @Post('changestatus')
    async adminChangeStatus(@Body() changeStatusDto : AdminChangeStatusDto) {
        return await this.adminEmergencyService.adminChangeStatus(changeStatusDto)
    } 
}