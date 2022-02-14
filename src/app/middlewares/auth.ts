import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
//import { promisify } from 'util';
import authData from '../../config/auth';
import User from '../models/User';

declare module 'express-session' {
  interface SessionData {
    usuario: User;
  }
}
class Autenticacao {
  async auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({ message: 'Token not provided', status: 400 });
    }
    const [, token] = authHeader.split(' ');

    try {
      jwt.verify(token, authData.key, (err, decoded) => {
        if (err) return res.status(400).json({ error: `error: ${err}` });
        req.session = decoded?.session;
        return next();
      });
    } catch (err) {
      return res.status(400).json({ error: 'falha na autenticação!', err });
    }
  }
}
export default new Autenticacao();
