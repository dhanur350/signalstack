import { z } from 'zod';

export const createEmployeeSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  department: z.string().min(1, 'Department is required'),
  role: z.string().min(1, 'Role is required'),
  country: z.string().min(2, 'Country is required'),
  salary: z.number().positive('Salary must be positive'),
  currency: z.string().default('USD'),
  employmentStatus: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  joiningDate: z.coerce.date(),
});

export type CreateEmployeeRequest = z.infer<typeof createEmployeeSchema>;

export const updateEmployeeSchema = createEmployeeSchema.partial();

export type UpdateEmployeeRequest = z.infer<typeof updateEmployeeSchema>;

export const employeeFilterSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  department: z.string().optional(),
  country: z.string().optional(),
  role: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['salary', 'firstName', 'joiningDate', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['ASC', 'DESC']).default('DESC'),
});

export type EmployeeFilterRequest = z.infer<typeof employeeFilterSchema>;

export const employeeResponseSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  department: z.string(),
  role: z.string(),
  country: z.string(),
  salary: z.number(),
  currency: z.string(),
  employmentStatus: z.string(),
  joiningDate: z.date(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type EmployeeResponse = z.infer<typeof employeeResponseSchema>;
