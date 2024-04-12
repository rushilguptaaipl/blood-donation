import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class ListEmergencyDto {

    @Transform(({ value }) => value ? value = Number(value) : null)
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    take: number

    @Transform(({ value }) => value ? value = Number(value) : null)
    @IsNotEmpty()
    @IsNumber()
    skip: number

}