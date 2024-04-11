import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class ListEmergencyDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    take: number

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    skip: number

}