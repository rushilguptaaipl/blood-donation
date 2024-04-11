import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class AdminGetDonationDto {

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    id: number;
}
