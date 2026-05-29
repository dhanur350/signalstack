import { z } from 'zod';

// Response schemas for analytics endpoints
export const totalCompensationResponseSchema = z.object({
  totalSpend: z.number(),
  currency: z.string(),
  employeeCount: z.number(),
  averageSalary: z.number(),
});

export type TotalCompensationResponse = z.infer<typeof totalCompensationResponseSchema>;

export const departmentAverageSchema = z.object({
  department: z.string(),
  averageSalary: z.number(),
  employeeCount: z.number(),
  totalSalary: z.number(),
});

export const departmentAveragesResponseSchema = z.array(departmentAverageSchema);

export type DepartmentAverageResponse = z.infer<typeof departmentAverageSchema>;

export const countryAverageSchema = z.object({
  country: z.string(),
  averageSalary: z.number(),
  employeeCount: z.number(),
  totalSalary: z.number(),
});

export const countryAveragesResponseSchema = z.array(countryAverageSchema);

export type CountryAverageResponse = z.infer<typeof countryAverageSchema>;

export const highestDepartmentsResponseSchema = z.array(departmentAverageSchema);

export type HighestDepartmentsResponse = z.infer<typeof highestDepartmentsResponseSchema>;

export const salaryDistributionSchema = z.object({
  min: z.number(),
  max: z.number(),
  average: z.number(),
  median: z.number(),
  percentile25: z.number(),
  percentile75: z.number(),
  percentile95: z.number(),
});

export type SalaryDistributionResponse = z.infer<typeof salaryDistributionSchema>;

export const employeeCountResponseSchema = z.object({
  active: z.number(),
  inactive: z.number(),
  total: z.number(),
  activePercentage: z.number(),
  inactivePercentage: z.number(),
});

export type EmployeeCountResponse = z.infer<typeof employeeCountResponseSchema>;

export const topEarnerSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  department: z.string(),
  role: z.string(),
  salary: z.number(),
  currency: z.string(),
  joiningDate: z.date(),
});

export const topEarnersResponseSchema = z.array(topEarnerSchema);

export type TopEarnerResponse = z.infer<typeof topEarnerSchema>;
