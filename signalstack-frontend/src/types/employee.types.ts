export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  country: string;
  salary: number;
  currency: string;
  employmentStatus: 'ACTIVE' | 'INACTIVE';
  joiningDate: string; // ISO String format
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SalaryHistory {
  id: string;
  employeeId: string;
  previousSalary: number;
  newSalary: number;
  changedAt: string;
  changedBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface EmployeeWithHistory extends Employee {
  salaryHistory: SalaryHistory[];
}

export interface CreateEmployeeInput {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  country: string;
  salary: number;
  currency?: string;
  employmentStatus?: 'ACTIVE' | 'INACTIVE';
  joiningDate: string;
}

export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;

export interface EmployeeFilters {
  page?: number;
  limit?: number;
  department?: string;
  country?: string;
  role?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  minSalary?: number;
  maxSalary?: number;
  search?: string;
  sortBy?: 'salary' | 'firstName' | 'joiningDate' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedEmployeeResponse {
  data: Employee[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
