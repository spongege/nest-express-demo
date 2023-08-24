import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role.guard';
import { ApplyReqUrl, ReqUrl, Role } from './role.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('guard')
@UseGuards(RoleGuard)
@ApiTags('守卫')
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  // @SetMetadata('role', ['admin', 'user'])
  // 自定义装饰器
  // @Role('role', ['admin', 'user'])
  @ApplyReqUrl('role', ['admin', 'user'])
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  findAll(@ReqUrl('host') url) {
    console.log(url);
    return this.guardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
