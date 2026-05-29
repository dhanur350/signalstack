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
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.service.ts
│   │   ├── auth.routes.ts
│   │   └── auth.schemas.ts
│   ├── employee/       # Employee management (Phase 2) ✅
│   │   ├── employee.controller.ts
│   │   ├── employee.service.ts
│   │   ├── employee.repository.ts
│   │   ├── employee.routes.ts
│   │   └── employee.schemas.ts
│   ├── analytics/      # Analytics (Phase 3) ✅
│   │   ├── analytics.controller.ts
│   │   ├── analytics.service.ts
│   │   ├── analytics.repository.ts
│   │   ├── analytics.routes.ts
│   │   └── analytics.schemas.ts
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

## API Endpoints

### Phase 1 - Authentication
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

### Phase 2 - Employee Management (All require JWT authentication)

#### Create Employee
- `POST /api/v1/employees`
  ```json
  {
    "employeeId": "EMP001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "department": "Engineering",
    "role": "Senior Engineer",
    "country": "US",
    "salary": 150000,
    "currency": "USD",
    "employmentStatus": "ACTIVE",
    "joiningDate": "2023-01-15"
  }
  ```

#### List Employees (with pagination and filtering)
- `GET /api/v1/employees?page=1&limit=20&department=Engineering&country=US&status=ACTIVE&minSalary=100000&maxSalary=200000&search=John&sortBy=salary&sortOrder=DESC`

#### Get Employee by ID
- `GET /api/v1/employees/:id`

#### Update Employee
- `PUT /api/v1/employees/:id`
  ```json
  {
    "firstName": "Jane",
    "salary": 160000
  }
  ```

#### Soft Delete Employee
- `DELETE /api/v1/employees/:id`

#### Restore Employee
- `POST /api/v1/employees/:id/restore`

#### Search Employees
- `GET /api/v1/employees/search?q=john`

#### Get Employees by Department
- `GET /api/v1/employees/department/:department`

### Query Parameters for List Employees

The list employees endpoint supports powerful filtering and sorting:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `department` - Filter by department (case-insensitive)
- `country` - Filter by country (case-insensitive)
- `role` - Filter by role (case-insensitive)
- `status` - Filter by employment status (ACTIVE, INACTIVE)
- `minSalary` - Minimum salary range
- `maxSalary` - Maximum salary range
- `search` - Search in firstName, lastName, email, employeeId
- `sortBy` - Sort field (salary, firstName, joiningDate, createdAt)
- `sortOrder` - Sort direction (ASC, DESC)

### Phase 3 - Analytics (All require JWT authentication)

#### Total Compensation Spend
- `GET /api/v1/analytics/total-spend` - Total salary spend, employee count, average salary

#### Average Salary by Department
- `GET /api/v1/analytics/avg-by-department` - Average salary grouped by department

#### Average Salary by Country
- `GET /api/v1/analytics/avg-by-country` - Average salary grouped by country

#### Highest Paid Departments
- `GET /api/v1/analytics/highest-departments?limit=5` - Top N departments by average salary

#### Salary Distribution
- `GET /api/v1/analytics/salary-distribution` - Min, max, average, median, percentiles

#### Employee Count Statistics
- `GET /api/v1/analytics/employee-count` - Active vs inactive employee count with percentages

#### Top Earners
- `GET /api/v1/analytics/top-earners?limit=10` - Top N highest paid employees

#### Top Earners by Department
- `GET /api/v1/analytics/top-earners/:department?limit=5` - Top N earners in a department

#### Employees Above Salary
- `GET /api/v1/analytics/above-salary?salary=100000` - Employees earning above specified salary

#### Highest Payroll Countries
- `GET /api/v1/analytics/highest-payroll-countries?limit=5` - Countries with highest total payroll

#### Salary Growth by Tenure
- `GET /api/v1/analytics/salary-by-tenure` - Average salary by tenure groups (0-1y, 1-3y, 3-5y, 5-10y, 10+y)

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

## Development Milestones

### Phase 1: Foundation ✅ COMPLETED
- [x] Express.js + TypeScript setup
- [x] Database setup (PostgreSQL + Prisma)
- [x] Authentication module (JWT, login)
- [x] Error handling & validation middleware

### Phase 2: Core Features ✅ COMPLETED
- [x] Employee module (CRUD operations)
- [x] Advanced filtering and search
- [x] Employee repository and service layer
- [x] Pagination support
- [x] Soft deletion support
- [x] Unit tests for employee service

### Phase 3: Analytics 🚀 IN PROGRESS
- [x] Analytics module implementation
- [x] 11 Analytics endpoints
- [x] Aggregation queries for insights
- [x] Unit tests for analytics service
- [ ] Integration tests
- [ ] Seed script for 10,000 employees

### Phase 4: AI Insights & Seeding (Coming Soon)
- [ ] Insights module (query mapping)
- [ ] Seed script for 10,000 employees
- [ ] Integration tests
- [ ] Performance optimization

### Phase 5: Production Ready (Coming Soon)
- [ ] Documentation
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Performance testing
- [ ] Security review
- [ ] Deployment setup

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

## Next Steps (Phase 4)

- AI Insights module implementation
- Query mapping for natural language questions
- Seed script for 10,000 realistic employees
- Integration tests
- Performance optimization
- API documentation (Swagger/OpenAPI)

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

