import { IsNotEmpty, IsString } from 'class-validator';
import { Donation } from '../../../donations/entities/donation.entity';
import { Transform } from 'class-transformer';

export class CreateCityDto {

  @Transform(({ value }) => value ? value.trim() : value)
  @IsNotEmpty()
  @IsString()
  city: string;

}
