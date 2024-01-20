import { IsNotEmpty, IsNumber } from "class-validator";

export class AdminListDonationDto {

    @IsNotEmpty()
    take : number

 
    @IsNotEmpty()
    skip : number
}