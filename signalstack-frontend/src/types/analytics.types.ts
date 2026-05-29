import { Employee } from './employee.types';

export interface TotalCompensationSpend {
  totalSpend: number;
  currency: string;
  employeeCount: number;
  averageSalary: number;
}

export interface DepartmentSalaryAggregate {
  department: string;
  averageSalary: number;
  employeeCount: number;
  totalSalary: number;
}

export interface CountrySalaryAggregate {
  country: string;
  averageSalary: number;
  employeeCount: number;
  totalSalary: number;
}

export interface SalaryDistribution {
  min: number;
  max: number;
  average: number;
  median: number;
  percentile25: number;
  percentile75: number;
  percentile95: number;
}

export interface EmployeeCountStats {
  active: number;
  inactive: number;
  total: number;
  activePercentage: number;
  inactivePercentage: number;
}

export interface GeographicPayrollAggregate {
  country: string;
  totalPayroll: number;
  employeeCount: number;
  averageSalary: number;
}

export interface TenureSalaryAggregate {
  tenure: string;
  averageSalary: number;
  employeeCount: number;
}

export interface TopEarnersResponse {
  data: Employee[];
  count: number;
}

export interface DashboardOverview {
  totalSpend: TotalCompensationSpend;
  employeeStats: EmployeeCountStats;
  departmentAggregates: DepartmentSalaryAggregate[];
  countryAggregates: CountrySalaryAggregate[];
}
