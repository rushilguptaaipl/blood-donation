import { IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class DeleteDonationDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    id: number;
}
