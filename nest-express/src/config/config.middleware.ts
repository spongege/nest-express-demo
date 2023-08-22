import { NextFunction, Request, Response } from 'express';
// 全局 中间件 使用函数的写法
export default function globalMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.method === 'GET') {
    res.send('我被全局拦截啦');
  } else {
    next();
  }
}
