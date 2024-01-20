import { BloodGroup } from "@emergency/enums/bloodGroup.enum";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AdminFilterDonationDto{
    @IsString()
    @IsNotEmpty()
    city : string;

    @IsEnum(BloodGroup)
    @IsNotEmpty()
    blood_group : BloodGroup

    @IsNotEmpty()
    take : number

    @IsNotEmpty()
    skip : number
}