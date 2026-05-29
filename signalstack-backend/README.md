# SignalStack Backend

Production-grade Employee Salary Management backend built with Express.js, TypeScript, and PostgreSQL.

## Setup & Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start PostgreSQL (using Docker)
```bash
docker-compose up -d
```

### Step 3: Setup Database
```bash
# Generate Prisma client
npm run prisma:generate

# Create database and run migrations
npm run prisma:migrate

# Open Prisma Studio to view database
npm run prisma:studio
```

### Step 4: Create Environment Variables
```bash
cp .env.example .env
```

Update `.env` with your configuration (if using docker-compose, defaults should work):
```
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/signalstack_db"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRY="7d"
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests

## Project Structure

```
src/
├── config/              # Configuration and database setup
├── middleware/          # Express middleware (auth, error handling)
├── modules/            # Feature modules
│   ├── auth/           # Authentication module
│   ├── employee/       # Employee management (Phase 2)
│   ├── analytics/      # Analytics (Phase 3)
│   └── insights/       # AI insights (Phase 4)
├── routes/             # Route definitions
├── types/              # TypeScript types and interfaces
├── utils/              # Utilities (errors, logger, helpers)
└── server.ts           # Main application entry point

prisma/
└── schema.prisma       # Database schema

seed/                   # Database seeding scripts

tests/                  # Unit and integration tests
```

## API Endpoints (Phase 1)

### Authentication
- `POST /api/v1/auth/login` - Manager login
  ```json
  {
    "email": "manager@acme.com",
    "password": "password123"
  }
  ```
  
- `POST /api/v1/auth/verify` - Verify token
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
  ```

### Health Check
- `GET /api/v1/health` - System health check

## Database Schema

### Manager (HR Users)
- Stores HR manager credentials
- Each manager can manage employees
- JWT authentication

### Employee
- Core employee salary data
- Soft delete support (isDeleted flag)
- Indexed for fast queries
- Currency support for international salaries
- Employment status tracking

### SalaryHistory
- Audit trail for salary changes
- Track previous and new salary
- Timestamp and who made the change

## Development Workflow

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Make code changes** - Server will restart on changes with ts-node

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Commit changes** with meaningful messages

## Error Handling

The application uses centralized error handling with custom error classes:
- `AppError` - Base error class
- `ValidationError` - Validation errors (400)
- `AuthenticationError` - Auth failures (401)
- `AuthorizationError` - Permission errors (403)
- `NotFoundError` - Resource not found (404)
- `ConflictError` - Conflicts (409)

All errors are caught by the error handler middleware and returned with appropriate HTTP status codes.

## Logging

Uses Pino for structured logging:
- Development: Pretty-printed logs with timestamps
- Production: JSON formatted logs
- Log levels: debug, info, warn, error

## Authentication

JWT-based authentication:
- Tokens generated on login
- Include manager ID and email in payload
- Protected routes validated via authMiddleware
- Token expiry: 7 days (configurable)

## Next Steps (Phase 2)

- Employee CRUD operations
- Advanced filtering and search
- Pagination support
- Employee soft deletion

## Security Notes

1. **Change JWT_SECRET** in production
2. **Use strong database passwords**
3. **Enable HTTPS** in production
4. **Validate all inputs** with Zod schemas
5. **Use environment variables** for sensitive data
6. **Enable rate limiting** (to be added)

## Testing

Unit tests cover:
- Service layer logic
- Validation schemas
- Error handling
- JWT operations

Run tests:
```bash
npm test
```

## Deployment

See Docker setup in `Dockerfile` (to be created) for containerization.

## License

ISC

