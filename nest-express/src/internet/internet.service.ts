import { Injectable } from '@nestjs/common';
import { CreateInternetDto } from './dto/create-internet.dto';
import { UpdateInternetDto } from './dto/update-internet.dto';

@Injectable()
export class InternetService {
  create(createInternetDto: CreateInternetDto) {
    return 'This action adds a new internet';
  }

  findAll() {
    return `This action returns all internet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} internet`;
  }

  update(id: number, updateInternetDto: UpdateInternetDto) {
    return `This action updates a #${id} internet`;
  }

  remove(id: number) {
    return `This action removes a #${id} internet`;
  }
}
