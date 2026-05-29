import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { loginSchema, verifyTokenSchema } from './auth.schemas';
import { logger } from '../../utils/logger';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate request body
      const { email, password } = loginSchema.parse(req.body);

      // Authenticate
      const result = await AuthService.login(email, password);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = verifyTokenSchema.parse(req.body);

      const payload = await AuthService.verifyToken(token);

      res.status(200).json({
        success: true,
        data: payload,
      });
    } catch (error) {
      next(error);
    }
  }
}
