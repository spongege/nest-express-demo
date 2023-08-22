import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

@Module({
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes(
      ListController,
      // {
      // path: 'list',
      // method: RequestMethod.POST || RequestMethod.GET,
      // }
    );
  }
}
