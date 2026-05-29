# Employee Salary Management Backend - Development Plan

## 1. ARCHITECTURE PLAN

### Layered Architecture
```
Presentation Layer (Routes/Controllers)
    ↓
Service Layer (Business Logic)
    ↓
Data Access Layer (Repositories/Queries)
    ↓
Database Layer (PostgreSQL + Prisma)
```

### Key Principles
- **Feature-based modules**: Each feature (Auth, Employees, Analytics, Insights) is self-contained
- **Thin Controllers**: Controllers only handle HTTP concerns, delegate to services
- **Service Layer**: Contains all business logic, reusable across controllers
- **Repository Pattern**: Data access abstraction for testability
- **Error Handling**: Centralized error middleware
- **Validation**: Zod schema validation at entry points
- **Logging**: Pino logger for structured logging
- **Environment Config**: Environment-based configuration management

---

## 2. MODULE BREAKDOWN

### Core Modules

#### 2.1 Authentication Module
- **Responsibilities**: JWT generation, login verification, token validation
- **Services**:
  - `authService.ts` - Login, token generation
  - `jwtService.ts` - Token creation/verification
- **Middleware**: 
  - `authMiddleware.ts` - Verify JWT on protected routes
- **Routes**: 
  - `POST /api/v1/auth/login` - Manager login
  - `POST /api/v1/auth/verify` - Verify token

#### 2.2 Employee Module
- **Responsibilities**: Employee CRUD operations, filtering, searching, soft deletion
- **Services**:
  - `employeeService.ts` - Create, update, delete, fetch operations
  - `employeeFilterService.ts` - Advanced filtering and search logic
- **Repositories**:
  - `employeeRepository.ts` - Database queries
- **Routes**:
  - `POST /api/v1/employees` - Create employee
  - `GET /api/v1/employees` - List with pagination, filtering, sorting
  - `GET /api/v1/employees/:id` - Get employee by ID
  - `PUT /api/v1/employees/:id` - Update employee
  - `DELETE /api/v1/employees/:id` - Soft delete employee

#### 2.3 Analytics Module
- **Responsibilities**: Compensation data analysis
- **Services**:
  - `analyticsService.ts` - Aggregation queries
- **Repositories**:
  - `analyticsRepository.ts` - Analytics-specific DB queries
- **Routes**:
  - `GET /api/v1/analytics/total-spend` - Total compensation
  - `GET /api/v1/analytics/avg-by-department` - Avg salary by dept
  - `GET /api/v1/analytics/avg-by-country` - Avg salary by country
  - `GET /api/v1/analytics/highest-departments` - Top departments
  - `GET /api/v1/analytics/salary-distribution` - Distribution stats
  - `GET /api/v1/analytics/employee-count` - Active vs inactive
  - `GET /api/v1/analytics/top-earners` - Top 10 earners

#### 2.4 AI Insights Module
- **Responsibilities**: Natural language query processing
- **Services**:
  - `insightsService.ts` - Query mapping and processing
  - `queryMapper.ts` - Map questions to analytics queries
- **Routes**:
  - `POST /api/v1/insights/ask` - Ask compensation questions

#### 2.5 Utilities & Infrastructure
- **Error Handling**: `errorHandler.ts`, `AppError.ts`
- **Validation**: `schemas/` directory with Zod schemas
- **Logging**: Logger configuration
- **Database**: Prisma setup, migrations
- **Configuration**: `config.ts` - Environment variables

---

## 3. FOLDER STRUCTURE

```
signalstack-backend/
├── src/
│   ├── config/
│   │   ├── config.ts              # Environment & app configuration
│   │   └── database.ts            # Database connection setup
│   │
│   ├── middleware/
│   │   ├── authMiddleware.ts      # JWT verification
│   │   ├── errorHandler.ts        # Centralized error handling
│   │   ├── requestLogger.ts       # Request logging
│   │   └── validateRequest.ts     # Zod validation middleware
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.schemas.ts
│   │   │
│   │   ├── employee/
│   │   │   ├── employee.controller.ts
│   │   │   ├── employee.service.ts
│   │   │   ├── employee.repository.ts
│   │   │   ├── employeeFilter.service.ts
│   │   │   ├── employee.routes.ts
│   │   │   └── employee.schemas.ts
│   │   │
│   │   ├── analytics/
│   │   │   ├── analytics.controller.ts
│   │   │   ├── analytics.service.ts
│   │   │   ├── analytics.repository.ts
│   │   │   ├── analytics.routes.ts
│   │   │   └── analytics.schemas.ts
│   │   │
│   │   └── insights/
│   │       ├── insights.controller.ts
│   │       ├── insights.service.ts
│   │       ├── queryMapper.ts
│   │       ├── insights.routes.ts
│   │       └── insights.schemas.ts
│   │
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Migration files
│   │
│   ├── utils/
│   │   ├── logger.ts              # Pino logger setup
│   │   ├── errors.ts              # Custom error classes
│   │   ├── constants.ts           # App constants
│   │   └── helpers.ts             # Utility functions
│   │
│   ├── routes/
│   │   └── route.ts               # Central route registry
│   │
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   │
│   └── server.ts                  # Main application entry point
│
├── seed/
│   ├── seed.ts                    # Main seeding script
│   ├── seedData.ts                # Employee data generator
│   └── prisma-seed.ts             # Prisma seed file
│
├── tests/
│   ├── unit/
│   │   ├── auth.service.test.ts
│   │   ├── employee.service.test.ts
│   │   ├── analytics.service.test.ts
│   │   └── insights.service.test.ts
│   │
│   └── integration/
│       └── (test files)
│
├── .env.example
├── .env
├── .gitignore
├── .eslintrc.json
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

---

## 4. DATABASE SCHEMA DESIGN

### Entities

#### Manager (HR Users)
```
- id (UUID, PK)
- email (String, unique)
- password (String, hashed)
- firstName (String)
- lastName (String)
- createdAt (DateTime)
- updatedAt (DateTime)
```

#### Employee
```
- id (UUID, PK)
- employeeId (String, unique)
- firstName (String)
- lastName (String)
- email (String, unique)
- department (String)
- role (String)
- country (String)
- salary (Decimal)
- currency (String)
- employmentStatus (String: ACTIVE, INACTIVE)
- joiningDate (DateTime)
- isDeleted (Boolean, default: false) - Soft delete
- deletedAt (DateTime, nullable)
- createdBy (UUID, FK to Manager)
- updatedBy (UUID, FK to Manager)
- createdAt (DateTime)
- updatedAt (DateTime)

Indexes:
- department, country, employmentStatus (filtering)
- email (search)
- salary (analytics)
- isDeleted (soft delete queries)
```

#### Salary History (for future auditing)
```
- id (UUID, PK)
- employeeId (UUID, FK)
- previousSalary (Decimal)
- newSalary (Decimal)
- changedAt (DateTime)
- changedBy (UUID, FK to Manager)
```

---

## 5. API PLANNING

### Authentication Endpoints
```
POST   /api/v1/auth/login           - Manager login (returns JWT)
POST   /api/v1/auth/verify          - Verify token validity
```

### Employee Endpoints
```
GET    /api/v1/employees            - List all (paginated, filterable)
POST   /api/v1/employees            - Create new employee
GET    /api/v1/employees/:id        - Get employee details
PUT    /api/v1/employees/:id        - Update employee
DELETE /api/v1/employees/:id        - Soft delete employee
```

**Query Parameters for GET /api/v1/employees**:
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `department` (filter)
- `country` (filter)
- `role` (filter)
- `status` (filter: ACTIVE, INACTIVE)
- `minSalary`, `maxSalary` (range filter)
- `search` (firstName, lastName, email)
- `sortBy` (field)
- `sortOrder` (ASC, DESC)

### Analytics Endpoints
```
GET    /api/v1/analytics/total-spend      - Total compensation
GET    /api/v1/analytics/avg-by-department - Avg salary by dept
GET    /api/v1/analytics/avg-by-country    - Avg salary by country
GET    /api/v1/analytics/highest-departments - Top 5 departments
GET    /api/v1/analytics/salary-distribution - Distribution stats
GET    /api/v1/analytics/employee-count    - Active vs inactive
GET    /api/v1/analytics/top-earners       - Top 10 earners
```

### Insights Endpoints
```
POST   /api/v1/insights/ask         - Ask compensation question
```

**Request Body**:
```json
{
  "question": "Which department has the highest average salary?"
}
```

---

## 6. DEVELOPMENT MILESTONES

### Phase 1: Foundation (Week 1)
- [x] Express.js + TypeScript setup
- [ ] Database setup (PostgreSQL + Prisma)
- [ ] Authentication module (JWT, login)
- [ ] Error handling & validation middleware

### Phase 2: Core Features (Week 2)
- [ ] Employee module (CRUD operations)
- [ ] Advanced filtering and search
- [ ] Employee repository and service layer
- [ ] Unit tests for employee service

### Phase 3: Analytics (Week 3)
- [ ] Analytics module implementation
- [ ] Aggregation queries
- [ ] Analytics API endpoints
- [ ] Analytics service tests

### Phase 4: AI Insights & Seeding (Week 4)
- [ ] Insights module (query mapping)
- [ ] Seed script for 10,000 employees
- [ ] Integration tests
- [ ] Performance optimization
- [ ] Docker setup

### Phase 5: Production Ready (Week 5)
- [ ] Documentation
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Performance testing
- [ ] Security review
- [ ] Deployment setup

---

## Key Technologies Summary
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Validation**: Zod
- **Auth**: JWT (jsonwebtoken)
- **Logging**: Pino
- **Testing**: Jest
- **Container**: Docker

---

## Next Steps
Awaiting confirmation to proceed with Phase 1 implementation:
1. Database setup and Prisma schema
2. Authentication module
3. Error handling infrastructure
