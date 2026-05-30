'use client';

import { useState, useMemo } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import EmployeeDataTable from './EmployeeDataTable';
import EmployeeFilterPanel from './EmployeeFilterPanel';
import { Employee, EmployeeFilters } from '../types/index';

export default function EmployeeList() {
  const [filters, setFilters] = useState<EmployeeFilters>({
    page: 1,
    limit: 20,
  });

  const { data, isLoading, isError, error } = useEmployees(filters);

  const handleFilterChange = (newFilters: Partial<EmployeeFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Error loading employees: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EmployeeFilterPanel onFilterChange={handleFilterChange} />
      <EmployeeDataTable
        data={data?.data || []}
        pagination={data?.pagination}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
