import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
// 管道转换
// ValidationPipe
// ParseIntPipe
// ParseFloatPipe
// ParseBoolPipe
// ParseArrayPipe
// ParseUUIDPipe
// ParseEnumPipe
// DefaultValuePipe
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('UC') private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    return this.userService.findAll();
  }
  // @Get(':id')
  // //如果 传入的不为int ，则不通过校验
  // findId(@Param('id') id) {
  //   console.log(typeof id);
  //   return +id;
  // }
}
