import { IsNotEmpty, IsNumber } from "class-validator";

export class ListEmergencyDto{

    @IsNotEmpty()
    take : number

    @IsNotEmpty()
    skip : number

}