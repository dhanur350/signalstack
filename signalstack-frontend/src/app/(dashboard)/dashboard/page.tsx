import DashboardStats from '@/features/dashboard/components/DashboardStats';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Overview</h1>
      <DashboardStats />
    </div>
  );
}
