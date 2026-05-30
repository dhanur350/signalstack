import apiClient from './api-client';
import { ApiResponse } from '@/types/api.d';

export interface TotalSpend {
  totalSpend: number;
  currency: string;
  employeeCount: number;
  averageSalary: number;
}

export interface DepartmentAverage {
  department: string;
  averageSalary: number;
  employeeCount: number;
  totalSalary: number;
}

export interface CountryAverage {
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

export const AnalyticsService = {
  async getTotalSpend(): Promise<ApiResponse<TotalSpend>> {
    const response = await apiClient.get<ApiResponse<TotalSpend>>('/analytics/total-spend');
    return response.data;
  },

  async getAvgByDepartment(): Promise<ApiResponse<DepartmentAverage[]>> {
    const response = await apiClient.get<ApiResponse<DepartmentAverage[]>>('/analytics/avg-by-department');
    return response.data;
  },

  async getAvgByCountry(): Promise<ApiResponse<CountryAverage[]>> {
    const response = await apiClient.get<ApiResponse<CountryAverage[]>>('/analytics/avg-by-country');
    return response.data;
  },

  async getSalaryDistribution(): Promise<ApiResponse<SalaryDistribution>> {
    const response = await apiClient.get<ApiResponse<SalaryDistribution>>('/analytics/salary-distribution');
    return response.data;
  },

  async getEmployeeCount(): Promise<ApiResponse<EmployeeCountStats>> {
    const response = await apiClient.get<ApiResponse<EmployeeCountStats>>('/analytics/employee-count');
    return response.data;
  }
};
