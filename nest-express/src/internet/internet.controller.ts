import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  InternetService,
  SearchType,
  UpdateTagsType,
} from './internet.service';
import { CreateInternetDto } from './dto/create-internet.dto';
import { UpdateInternetDto } from './dto/update-internet.dto';

@Controller('internet')
export class InternetController {
  constructor(private readonly internetService: InternetService) {}

  @Post()
  create(@Body() createInternetDto: CreateInternetDto) {
    return this.internetService.create(createInternetDto);
  }
  @Post('/add/tags')
  addTags(@Body() body: UpdateTagsType) {
    return this.internetService.addTags(body);
  }

  @Get()
  findAll(@Query() query: SearchType) {
    return this.internetService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internetService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInternetDto: UpdateInternetDto,
  ) {
    return this.internetService.update(+id, updateInternetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internetService.remove(+id);
  }
}
