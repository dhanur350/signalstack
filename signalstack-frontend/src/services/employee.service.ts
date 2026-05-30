import apiClient from './api-client';
import { ApiResponse, PaginatedResponse } from '@/types/api.d';
import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest, EmployeeFilters } from '@/types/employee.d';

export const EmployeeService = {
  async getEmployees(filters: EmployeeFilters = {}): Promise<PaginatedResponse<Employee>> {
    const response = await apiClient.get<PaginatedResponse<Employee>>('/employees', { params: filters });
    return response.data;
  },

  async getEmployeeById(id: string): Promise<ApiResponse<Employee>> {
    const response = await apiClient.get<ApiResponse<Employee>>(`/employees/${id}`);
    return response.data;
  },

  async createEmployee(data: CreateEmployeeRequest): Promise<ApiResponse<Employee>> {
    const response = await apiClient.post<ApiResponse<Employee>>('/employees', data);
    return response.data;
  },

  async updateEmployee(id: string, data: UpdateEmployeeRequest): Promise<ApiResponse<Employee>> {
    const response = await apiClient.put<ApiResponse<Employee>>(`/employees/${id}`, data);
    return response.data;
  },

  async deleteEmployee(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(`/employees/${id}`);
    return response.data;
  },

  async restoreEmployee(id: string): Promise<ApiResponse<Employee>> {
    const response = await apiClient.post<ApiResponse<Employee>>(`/employees/${id}/restore`);
    return response.data;
  },

  async searchEmployees(query: string): Promise<ApiResponse<Employee[]>> {
    const response = await apiClient.get<ApiResponse<Employee[]>>('/employees/search', { params: { q: query } });
    return response.data;
  }
};
