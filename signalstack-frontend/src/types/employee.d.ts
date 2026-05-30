export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  currency: string;
  joiningDate: string;
  country: string;
  status: 'ACTIVE' | 'INACTIVE';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeRequest {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  currency: string;
  joiningDate: string;
  country: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {}

export interface EmployeeFilters {
  department?: string;
  country?: string;
  role?: string;
  status?: string;
  minSalary?: number;
  maxSalary?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}
