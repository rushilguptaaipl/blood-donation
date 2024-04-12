import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive} from 'class-validator';

export class GetCityDto {

  @Transform(({ value }) => value ? value = Number(value) : null)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
}
