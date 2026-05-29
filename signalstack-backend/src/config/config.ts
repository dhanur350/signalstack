import dotenv from 'dotenv';

dotenv.config();

type Config = {
  port: string | number;
  nodeEnv: string;
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiry: any;
  corsOrigin: string;
};

export const config: Config = {
  // Server
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiry: process.env.JWT_EXPIRY || '7d',

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

// Validate required environment variables
export const validateConfig = (): void => {
  const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
  }
};

export default config;
