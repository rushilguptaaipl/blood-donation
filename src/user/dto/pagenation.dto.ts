import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator"

export class PagentaionDto{

    @Transform(({ value }) => value ? value = Number(value) : null)
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(1)
    take : number

    @Transform(({ value }) => value ? value = Number(value) : null)
    @IsNotEmpty()
    @IsNumber()
    skip : number
}