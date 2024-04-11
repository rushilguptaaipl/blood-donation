import { IsNumber, IsOptional, IsPositive, Min } from "class-validator"


export class ListCityDto {

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    take: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    skip: number
}