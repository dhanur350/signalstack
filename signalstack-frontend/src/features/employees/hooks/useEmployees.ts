import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EmployeeService } from '@/services/employee.service';
import { Employee, EmployeeFilters, CreateEmployeeRequest, UpdateEmployeeRequest } from '@/types/employee.d';
import { PaginatedResponse } from '@/types/api.d';

// Fetch all employees with filters and pagination
export const useEmployees = (filters: EmployeeFilters = {}) => {
  return useQuery({
    queryKey: ['employees', filters],
    queryFn: () => EmployeeService.getEmployees(filters),
  });
};

// Fetch a single employee by ID
export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => EmployeeService.getEmployeeById(id),
    enabled: !!id,
  });
};

// Create a new employee
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeRequest) => EmployeeService.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

// Update an existing employee
export const useUpdateEmployee = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateEmployeeRequest) => EmployeeService.updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee', id] });
    },
  });
};

// Delete (soft delete) an employee
export const useDeleteEmployee = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => EmployeeService.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee', id] });
    },
  });
};

// Restore a soft-deleted employee
export const useRestoreEmployee = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => EmployeeService.restoreEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee', id] });
    },
  });
};

// Search employees
export const useSearchEmployees = (query: string) => {
  return useQuery({
    queryKey: ['employees', 'search', query],
    queryFn: () => EmployeeService.searchEmployees(query),
    enabled: !!query,
  });
};
