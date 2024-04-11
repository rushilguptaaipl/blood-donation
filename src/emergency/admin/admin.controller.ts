import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AdminChangeStatusDto } from "@emergency/dto/admin/change-status.dto";
import { DeleteEmergencyDto } from "@emergency/dto/admin/delete-emergency.dto";
import { AdminEmergencyService } from "@emergency/admin/admin.service";
import { AuthGuard } from "@user/guards/auth.guard";
import { ListEmergencyDto } from "@emergency/dto/admin/list-emergency.dto";

@Controller("admin")
@UseGuards(AuthGuard)
export class AdminEmergencyController {
    constructor(private readonly adminEmergencyService: AdminEmergencyService) { }

    @Get('listemergency')
    async adminListEmergency(@Query() listEmergencyDto: ListEmergencyDto) {
        return await this.adminEmergencyService.adminListEmergency(listEmergencyDto);
    }

    @Post('deleteemergency')
    async adminDeleteEmergency(@Body() deleteEmergencyDto: DeleteEmergencyDto) {
        return await this.adminEmergencyService.adminDeleteEmergency(deleteEmergencyDto);
    }

    @Post('changestatus')
    async adminChangeStatus(@Body() changeStatusDto: AdminChangeStatusDto) {
        return await this.adminEmergencyService.adminChangeStatus(changeStatusDto)
    }
}