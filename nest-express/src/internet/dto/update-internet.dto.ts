import { PartialType } from '@nestjs/swagger';
import { CreateInternetDto } from './create-internet.dto';

export class UpdateInternetDto extends PartialType(CreateInternetDto) {}
