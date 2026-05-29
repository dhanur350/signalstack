import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../modules/auth/jwt.service';
import { AuthenticationError } from '../utils/errors';

export interface AuthenticatedRequest extends Request {
  managerId?: string;
  managerEmail?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const payload = JwtService.verifyToken(token);

    req.managerId = payload.id;
    req.managerEmail = payload.email;

    next();
  } catch (error) {
    next(error);
  }
};
