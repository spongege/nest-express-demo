import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternetService } from './internet.service';
import { CreateInternetDto } from './dto/create-internet.dto';
import { UpdateInternetDto } from './dto/update-internet.dto';

@Controller('internet')
export class InternetController {
  constructor(private readonly internetService: InternetService) {}

  @Post()
  create(@Body() createInternetDto: CreateInternetDto) {
    return this.internetService.create(createInternetDto);
  }

  @Get()
  findAll() {
    return this.internetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInternetDto: UpdateInternetDto) {
    return this.internetService.update(+id, updateInternetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internetService.remove(+id);
  }
}
