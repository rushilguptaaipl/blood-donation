import { IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator"

export class PagentaionDto{

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(1)
    take : number

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    skip : number
}