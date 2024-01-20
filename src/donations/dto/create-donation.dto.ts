import { BloodGroup } from '@emergency/enums/bloodGroup.enum';
import { Gender } from '@emergency/enums/gender.enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  contact: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsString()
  DOB: string;

  @IsBoolean()
  disease: boolean;

  @IsEnum(BloodGroup)
  @IsNotEmpty()
  blood_group : BloodGroup

  @IsEnum(Gender)
  @IsNotEmpty()
  gender : Gender

  @IsString()
  @IsNotEmpty()
  email :string
}
