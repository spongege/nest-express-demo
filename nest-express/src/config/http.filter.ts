import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    res.status(status).json({
      status,
      data: exception.message,
      url: req.url,
      time: Date.now(),
      success: false,
    });
    // res.send({
    //   status,
    //   data: exception.message,
    //   url: req.url,
    //   time: Date.now(),
    //   success: false,
    // });
  }
}
