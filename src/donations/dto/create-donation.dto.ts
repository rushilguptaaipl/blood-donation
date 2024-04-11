import { BloodGroup } from '@emergency/enums/bloodGroup.enum';
import { Gender } from '@emergency/enums/gender.enum';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateDonationDto {

  @Transform(({ value }) => value ? value.trim() : value)
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  contact: number;

  @Transform(({ value }) => value ? value.trim() : value)
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  DOB: Date;

  @IsBoolean()
  disease: boolean;

  @IsEnum(BloodGroup)
  @IsNotEmpty()
  blood_group : BloodGroup

  @IsEnum(Gender)
  @IsNotEmpty()
  gender : Gender

  @Transform(({ value }) => value ? value.trim() : value)
  @IsNotEmpty()
  @IsEmail()
  email :string
}
