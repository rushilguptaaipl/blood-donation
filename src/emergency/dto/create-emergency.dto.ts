import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { BloodGroup } from '@emergency/enums/bloodGroup.enum';

export class CreateEmergencyDto {
  @IsString()
  @IsNotEmpty()
  registerar_name: string;

  @IsNotEmpty()
  @IsString()
  patient_name: string;

  @IsNotEmpty()
  contact: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  hospital: string;

  @IsEnum(BloodGroup)
  @IsNotEmpty()
  blood_group: BloodGroup;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;
}
