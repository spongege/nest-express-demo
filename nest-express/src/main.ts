import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import {
  VERSION_NEUTRAL,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import * as cors from 'cors';
import globalMiddleWare from './config/config.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { HttpResponse } from './config/http.response';
import { HttpFilter } from './config/http.filter';
// import { RoleGuard } from './guard/role.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/myimages',
  });

  // 使用 cors 中间件解决跨域
  app.use(cors());
  // 全局 中间件
  app.use(globalMiddleWare);
  // 全局相应拦截器
  app.useGlobalInterceptors(new HttpResponse());
  // 全局异常拦截器
  // app.useGlobalFilters(new HttpFilter());
  // 管道校验器
  app.useGlobalPipes(new ValidationPipe());
  // 全局使用守卫
  // app.useGlobalGuards(new RoleGuard());
  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
  });
  // 配置session
  app.use(
    session({
      secret: 'sponge',
      name: 'sponge.sid',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  await app.listen(3000);
}
bootstrap();
