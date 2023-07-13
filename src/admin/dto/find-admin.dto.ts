import { IsNotEmpty, IsString } from 'class-validator';

export class FindAdminDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  blood_group: string;
}
