import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const request = req.headers['auth-user']
    //verification du format du token (bearer header.payload.signature)
    if ((!request) || (request.split(' ').length !== 2) || (request.split(' ')[0] !== 'Bearer')) {
      console.log("Caught in Middleware Unauthorized 1: ", request)
      return res.status(401).send('Unauthorized')
    }

    const token = request.split(' ')[1]

    try {
      //cle secrete et extraction du payload
      const secret = process.env.JWT_SECRET || 'secret'
      const payload = jwt.verify(token, secret)

      //@ts-ignore
      req.body.userId = payload.id;

      next()
    } catch (e) {
      console.log("Caught in Middleware Unauthorized 2")
      return res.status(401).send('Unauthorized')
    }
  }
}