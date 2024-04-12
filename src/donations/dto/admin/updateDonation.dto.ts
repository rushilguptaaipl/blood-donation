import { BloodGroup } from '@emergency/enums/bloodGroup.enum';
import { Gender } from '@emergency/enums/gender.enum';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Entity } from 'typeorm';

export class AdminUpdateDonationDto {

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;

  @Transform(({ value }) => value ? value.trim() : value)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Transform(({ value }) => value ? value = Number(value) : null)
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
  blood_group: BloodGroup;

  @IsEnum(Gender)
  gender: Gender;

  @Transform(({ value }) => value ? value.trim() : value)
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
