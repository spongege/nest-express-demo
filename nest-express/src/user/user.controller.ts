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
  Response,
  Inject,
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
  constructor(
    @Inject('UC')
    private readonly userService: UserService,
    @Inject('TEST') private readonly test: Record<string, any>,
  ) {}

  @Get()
  findAll(@Query() query) {
    console.log(query);
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body) {
    console.log(body);
    return {
      code: 200,
      message: body.id,
    };
  }

  // @Get(':id')
  // @HttpCode(200)
  // findId(@Param() param, @Headers() headers) {
  //   console.log(param, headers);
  //   return {
  //     code: 200,
  //     message: param.id,
  //   };
  // }
  /* 抽离到 service 文件 */
  // @Get('code')
  // createCaptcha(@Request() req, @Response() res) {
  //   const captcha = svgCaptcha.create({
  //     size: 6, //生成几个验证码
  //     fontSize: 50, //文字大小
  //     width: 100, //宽度
  //     height: 34, //高度
  //     background: '#cc9966', //背景颜色
  //   });

  //   req.session.code = captcha.text; //存储验证码记录到session
  //   console.log(req.session);
  //   res.type('image/svg+xml');
  //   res.send(captcha.data);
  // }

  // @Post('create')
  // createUser(@Request() req, @Body() body) {
  //   console.log(req.session.code, body);
  //   if (
  //     req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
  //   ) {
  //     return {
  //       message: '验证码正确',
  //     };
  //   } else {
  //     return {
  //       message: '验证码错误',
  //     };
  //   }
  // }

  @Get('code')
  createCaptcha(@Request() req, @Response() res) {
    return this.userService.createCaptcha(req, res);
  }

  @Post('create')
  createUser(@Request() req, @Body() body) {
    return this.userService.createUser(req, body);
  }
}
