import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class ListCityDto {
  @Transform(({ value }) => (value ? (value = Number(value)) : null))
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  take: number;

  @Transform(({ value }) => (value ? (value = Number(value)) : null))
  @IsOptional()
  @IsNumber()
  skip: number;

  @IsOptional()
  @IsString()
  search: string;
}
