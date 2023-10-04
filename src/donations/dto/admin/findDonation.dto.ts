import { IsNotEmpty, IsString } from "class-validator";

export class AdminFindDonationDto{
    @IsString()
    @IsNotEmpty()
    city : string;

    @IsString()
    @IsNotEmpty()
    blood_group : string
}