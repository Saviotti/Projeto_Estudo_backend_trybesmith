import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtsecret = process.env.JWT_SECRET;

const tokenValidation = (req: Request, res: Response, next: NextFunction): unknown => {
  const { authorization } = req.headers;

  if (!authorization) { return res.status(401).json({ message: 'Token not found' }); }

  const token = authorization.split(' ')[1];
  try {
    jwt.verify(token, jwtsecret || 'secret');
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default tokenValidation;