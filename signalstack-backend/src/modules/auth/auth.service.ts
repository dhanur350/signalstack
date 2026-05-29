import bcrypt from 'bcryptjs';
import { prisma } from '../../config/database';
import { JwtService } from './jwt.service';
import { AuthenticationError } from '../../utils/errors';
import { logger } from '../../utils/logger';

export class AuthService {
  static async login(email: string, password: string) {
    try {
      // Find manager by email
      const manager = await prisma.manager.findUnique({
        where: { email },
      });

      if (!manager) {
        throw new AuthenticationError('Invalid email or password');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, manager.password);

      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid email or password');
      }

      // Generate token
      const token = JwtService.generateToken({
        id: manager.id,
        email: manager.email,
      });

      logger.info({ managerId: manager.id }, 'Manager logged in successfully');

      return {
        id: manager.id,
        email: manager.email,
        firstName: manager.firstName,
        lastName: manager.lastName,
        token,
      };
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      logger.error(error, 'Login error');
      throw new AuthenticationError('Authentication failed');
    }
  }

  static async verifyToken(token: string) {
    try {
      const payload = JwtService.verifyToken(token);

      // Verify manager still exists
      const manager = await prisma.manager.findUnique({
        where: { id: payload.id },
      });

      if (!manager) {
        throw new AuthenticationError('Manager not found');
      }

      return payload;
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      throw new AuthenticationError('Token verification failed');
    }
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async register(email: string, password: string, firstName: string, lastName: string) {
    try {
      // Check if manager already exists
      const existingManager = await prisma.manager.findUnique({
        where: { email },
      });

      if (existingManager) {
        throw new Error('Manager with this email already exists');
      }

      // Hash password
      const hashedPassword = await this.hashPassword(password);

      // Create manager
      const manager = await prisma.manager.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
      });

      logger.info({ managerId: manager.id, email }, 'Manager registered successfully');

      // Generate token
      const token = JwtService.generateToken({
        id: manager.id,
        email: manager.email,
      });

      return {
        id: manager.id,
        email: manager.email,
        firstName: manager.firstName,
        lastName: manager.lastName,
        token,
      };
    } catch (error) {
      logger.error(error, 'Registration error');
      throw error;
    }
  }
}
