import { IsNotEmpty, IsNumber, IsPositive} from 'class-validator';

export class GetCityDto {

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
}
