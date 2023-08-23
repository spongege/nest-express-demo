import { Controller, Get, Inject } from '@nestjs/common';
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
}
