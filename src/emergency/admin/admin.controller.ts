import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AdminEmergencyService } from "./admin.service";
import { DeleteEmergencyDto } from "../dto/admin/delete-emergency.dto";

@Controller("admin")
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
}