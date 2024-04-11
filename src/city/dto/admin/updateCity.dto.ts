import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"

export class UpdateCityDto{
    
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    id:number

    @Transform(({ value }) => value ? value.trim() : value)
    @IsNotEmpty()
    @IsString()
    city:string
}