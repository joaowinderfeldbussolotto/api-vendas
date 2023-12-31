import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT Token is missing');

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodeToken as TokenPayload;
    //We need to override Express Request
    request.user = {
      id: sub,
    };
    return next();
  } catch (err) {
    throw new AppError('Invalid JWT Token');
  }
}
