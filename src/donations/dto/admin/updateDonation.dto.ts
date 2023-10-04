import {
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
  contact: number;

  @IsString()
  city: string;

  @IsString()
  DOB: string;

  @IsString()
  disease: string;

  @IsString()
  blood_group: string;

  gender: 'Male' | 'Female';

  @IsString()
  email: string;
}
