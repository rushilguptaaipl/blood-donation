import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  contact: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsString()
  DOB: string;

  @IsString()
  disease: string;

  @IsString()
  @IsNotEmpty()
  blood_group:string

  @IsString()
  @IsNotEmpty()
  email :string
}
