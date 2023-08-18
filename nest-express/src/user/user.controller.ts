import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  Headers,
  HttpCode,
  // Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  path: 'user',
  // version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(@Query() query) {
    console.log(query);
    return {
      code: 200,
      message: query.id,
    };
  }

  @Post()
  create(@Body() body) {
    console.log(body);
    return {
      code: 200,
      message: body.id,
    };
  }

  @Get(':id')
  @HttpCode(200)
  findId(@Param() param, @Headers() headers) {
    console.log(param, headers);
    return {
      code: 200,
      message: param.id,
    };
  }
}
