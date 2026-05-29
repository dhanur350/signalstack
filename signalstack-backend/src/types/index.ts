import { Request } from 'express';

// Extend Express Request to include authenticated user info
declare global {
  namespace Express {
    interface Request {
      managerId?: string;
      managerEmail?: string;
    }
  }
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}

// Manager types
export interface ManagerPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Employee types
export interface EmployeeData {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  country: string;
  salary: number;
  currency: string;
  employmentStatus: string;
  joiningDate: Date;
}

export interface EmployeeWithId extends EmployeeData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
