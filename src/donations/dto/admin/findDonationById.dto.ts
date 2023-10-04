import { IsNotEmpty, IsString } from "class-validator";

export class FindDonationbyIdDto {
    @IsNotEmpty()
    id:number;
}
