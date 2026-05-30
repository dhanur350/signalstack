'use client';

import Link from 'next/link';
import { Employee } from '../types/index';
import { ROUTES } from '@/lib/constants';

interface EmployeeDataTableProps {
  data: Employee[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
}

export default function EmployeeDataTable({
  data,
  pagination,
  isLoading,
  onPageChange,
}: EmployeeDataTableProps) {
  if (isLoading) {
    return <div className="text-center py-6 text-gray-500">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-6 text-gray-500">No employees found.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider">
              Employee ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider">
              Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {data.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{employee.employeeId}</td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                {employee.firstName} {employee.lastName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{employee.email}</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{employee.department}</td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                {employee.currency} {employee.salary.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  employee.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {employee.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <Link href={ROUTES.employeeDetail(employee.id)} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && pagination.totalPages > 1 && (
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
