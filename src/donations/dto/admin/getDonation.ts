import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class AdminGetDonationDto {

    @Transform(({ value }) => value ? value = Number(value) : null)
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    id: number;
}
