import { BloodGroup } from "@emergency/enums/bloodGroup.enum";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AdminListDonationDto {

    @IsNotEmpty()
    take : number
 
    @IsNotEmpty()
    skip : number

    blood_group : BloodGroup

    city : string
}