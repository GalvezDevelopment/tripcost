import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  destination: string;
  @IsOptional()
  description: string = '';
  @IsOptional()
  @IsDateString()
  whenStart: Date;
  @IsOptional()
  @IsDateString()
  whenReturn: Date;
}
