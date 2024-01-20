import { IsNotEmpty, IsNumber } from "class-validator";

export class AdminChangeStatusDto{

    @IsNotEmpty()
    @IsNumber()
    id:number
}