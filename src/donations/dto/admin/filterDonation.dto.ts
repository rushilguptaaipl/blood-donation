import { BloodGroup } from "@emergency/enums/bloodGroup.enum";
import { PagentaionDto } from "@user/dto/pagenation.dto";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class AdminFilterDonationDto extends PagentaionDto {

    @Transform(({ value }) => value ? value.trim() : value)
    @IsNotEmpty()
    @IsString()
    city: string;

    @IsEnum(BloodGroup)
    @IsNotEmpty()
    blood_group: BloodGroup
}