import { BloodGroup } from '@emergency/enums/bloodGroup.enum';
import { Gender } from '@emergency/enums/gender.enum';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Entity } from 'typeorm';

export class AdminUpdateDonationDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  name: string;

  @IsString()
  contact: string;

  @IsString()
  city: string;

  @IsString()
  DOB: string;

  @IsBoolean()
  disease: boolean;

  @IsEnum(BloodGroup)
  blood_group: BloodGroup;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  email: string;
}
