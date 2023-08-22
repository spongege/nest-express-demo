import { Module, Provider } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

const UCmodule: Provider = {
  useClass: UserService,
  provide: 'UC',
  // useFactory(...args) {},
};

@Module({
  controllers: [UserController],
  providers: [
    // UserService,
    UCmodule,
    {
      provide: 'TEST',
      useValue: {
        a: 1,
      },
    },
  ],
  exports: [UCmodule],
})
export class UserModule {}
