import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeleteEmergencyDto {
    @IsNotEmpty()
    @IsNumber()
    id:number;
}
