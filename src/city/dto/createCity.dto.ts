import { IsNotEmpty, IsString } from 'class-validator';
import { Donation } from '../../donations/entities/donation.entity';

export class CreateCityDto {

  @IsNotEmpty()
  @IsString()
  city: string;

}
