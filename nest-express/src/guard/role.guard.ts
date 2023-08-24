import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roleArr = this.reflector.get<string[]>('role', context.getHandler());
    // 没有配置权限则直接通过
    if (!roleArr) return true;

    console.log('经过了守卫', roleArr);
    const request = context.switchToHttp().getRequest<Request>();
    // console.log(request.body);
    if (roleArr.includes(request.body.role)) {
      return true;
    }
    return false;
  }
}
