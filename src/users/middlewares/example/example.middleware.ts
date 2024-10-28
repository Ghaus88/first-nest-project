import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('Forbidden', 403);

    if (authorization !== 'test-token')
      throw new HttpException('Invalid Token', 403);
    else next();
  }
}
