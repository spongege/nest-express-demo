import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Data<T> {
  data: T;
}
@Injectable()
export class HttpResponse<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Data<T>> {
    // console.log(context);
    return next.handle().pipe(
      map((data) => {
        // console.log(data);
        return {
          data,
          status: 0,
          success: true,
          message: '成功format成json返回啦！',
        };
      }),
    );
  }
}
