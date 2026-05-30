import EmployeeList from '@/features/employees/components/EmployeeList';

export default function EmployeesPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Employee Management</h1>
      <EmployeeList />
    </div>
  );
}
