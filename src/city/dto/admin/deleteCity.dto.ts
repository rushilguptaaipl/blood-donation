import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCityDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
