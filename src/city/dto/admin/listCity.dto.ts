import { IsNotEmpty, IsNumber } from "class-validator";

export class ListCityDto {
    // @IsNumber()
    // @IsNotEmpty()
    take : number

    // @IsNumber()
    // @IsNotEmpty()
    skip : number
}