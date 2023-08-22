import { IsNotEmpty, IsNumber } from "class-validator";

export class deleteDonation{
    @IsNotEmpty()
    @IsNumber()
    id:number;
}