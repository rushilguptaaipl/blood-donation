import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  blood_group: string;

  @IsNotEmpty()
  gender: 'M' | 'F';
}
