import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { AuthenticationError } from '../../utils/errors';

export interface JwtPayload {
  id: string;
  email: string;
}

export class JwtService {
  static generateToken(payload: JwtPayload): string {
    return jwt.sign({id: payload}, config.jwtSecret, { expiresIn: config.jwtExpiry });
  }

  static verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token');
    }
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
