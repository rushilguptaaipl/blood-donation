import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { BloodGroup } from '@emergency/enums/bloodGroup.enum';
import { Transform } from 'class-transformer';

export class CreateEmergencyDto {

  @Transform(({ value }) => value ? value.trim() : value)
  @IsNotEmpty()
  @IsString()
  registerar_name: string;

  @Transform(({ value }) => value ? value.trim() : value)
  @IsNotEmpty()
  @IsString()
  patient_name: string;

  @IsNotEmpty()
  contact: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @Transform(({ value }) => value ? value.trim() : value)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  age: number;

  @Transform(({ value }) => value ? value.trim() : value)
  @IsNotEmpty()
  @IsString()
  hospital: string;

  @IsEnum(BloodGroup)
  @IsNotEmpty()
  blood_group: BloodGroup;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;
}
