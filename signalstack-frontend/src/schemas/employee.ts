import { z } from 'zod';

export const createEmployeeSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  department: z.string().min(1, 'Department is required'),
  role: z.string().min(1, 'Role is required'),
  salary: z.number().min(0, 'Salary must be positive'),
  currency: z.string().min(1, 'Currency is required').default('USD'),
  joiningDate: z.string().min(1, 'Joining date is required'),
  country: z.string().min(1, 'Country is required'),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
});

export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;

export const updateEmployeeSchema = createEmployeeSchema.partial();
export type UpdateEmployeeFormData = z.infer<typeof updateEmployeeSchema>;
