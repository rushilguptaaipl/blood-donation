import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class DeleteEmergencyDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    id: number;
}
