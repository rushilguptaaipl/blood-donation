import { IsNotEmpty, IsString } from "class-validator";

export class deleteEmergencyDto {
    @IsNotEmpty()
    @IsString()
    id:string;
}
