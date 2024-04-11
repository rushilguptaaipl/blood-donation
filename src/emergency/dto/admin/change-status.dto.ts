import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class AdminChangeStatusDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    id: number
}