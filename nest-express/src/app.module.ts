import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    UserModule,
    ListModule,
    ConfigModule.forRoot({
      path: '/someroute',
    }),
    UploadModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
