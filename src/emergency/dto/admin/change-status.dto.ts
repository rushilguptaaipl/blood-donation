import { IsNotEmpty } from "class-validator";

export class AdminChangeStatusDto{
    @IsNotEmpty()
    id:number
}