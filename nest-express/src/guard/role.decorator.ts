import {
  ExecutionContext,
  SetMetadata,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const Role = (key: string, args: string[]) => SetMetadata(key, args);

export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return data + '/' + request.url;
  },
);

export const ApplyReqUrl = (key: string, args: string[]) => {
  return applyDecorators(Role(key, args));
};
