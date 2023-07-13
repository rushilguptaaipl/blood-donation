import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  contact: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsString()
  disease: string;

  @IsString()
  @IsNotEmpty()
  blood_group:string
}
