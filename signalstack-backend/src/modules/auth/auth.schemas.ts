import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  token: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const verifyTokenSchema = z.object({
  token: z.string(),
});

export type VerifyTokenRequest = z.infer<typeof verifyTokenSchema>;
