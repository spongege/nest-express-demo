import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    UserModule,
    ListModule,
    ConfigModule.forRoot({
      path: '/someroute',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
