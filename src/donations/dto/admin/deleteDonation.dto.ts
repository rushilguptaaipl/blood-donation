import { IsNotEmpty, IsString } from "class-validator";

export class DeleteDonationDto {
    @IsNotEmpty()
    id:number;
}
