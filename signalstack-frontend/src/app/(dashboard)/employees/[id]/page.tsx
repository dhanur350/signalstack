import { notFound } from 'next/navigation';
// import EmployeeDetailCard from '@/features/employees/components/EmployeeDetailCard';

interface EmployeeDetailPageProps {
  params: { id: string };
}

export default function EmployeeDetailPage({ params }: EmployeeDetailPageProps) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Employee Detail</h1>
      <p>Displaying details for employee ID: {id}</p>
      {/* TODO: Fetch and display employee details using EmployeeDetailCard */}
      {/* <EmployeeDetailCard employeeId={id} /> */}
    </div>
  );
}
