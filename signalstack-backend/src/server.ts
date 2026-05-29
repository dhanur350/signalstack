import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { API_PREFIX, routes } from './routes/route';
import { healthRoutes } from './routes/health';
import { authRoutes } from './modules/auth/auth.routes';
import { errorHandler } from './middleware/errorHandler';
import { config, validateConfig } from './config/config';
import { logger } from './utils/logger';

// Validate environment variables
validateConfig();

const app: Express = express();
const port = config.port;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(`${API_PREFIX}${routes.authLogin}`, authRoutes);
app.use(`${API_PREFIX}${routes.authVerify}`, authRoutes);
app.use(`${API_PREFIX}${routes.health}`, healthRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

export default app;
