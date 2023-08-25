import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInternetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  desc: string;
}
