'use client';

import { useTotalSpend, useAvgByDepartment, useAvgByCountry, useEmployeeCount } from '@/features/analytics/hooks/useAnalytics';
import StatsCard from './StatsCard';

export default function DashboardStats() {
  const { data: totalSpend, isLoading: isSpendLoading } = useTotalSpend();
  const { data: deptAvg, isLoading: isDeptLoading } = useAvgByDepartment();
  const { data: countryAvg, isLoading: isCountryLoading } = useAvgByCountry();
  const { data: empCount, isLoading: isCountLoading } = useEmployeeCount();

  if (isSpendLoading || isDeptLoading || isCountryLoading || isCountLoading) {
    return <div className="text-center py-6">Loading dashboard data...</div>;
  }

  const avgDept = deptAvg?.data ? deptAvg.data[0]?.averageSalary : 0;
  const totalEmployees = empCount?.data?.total || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Salary Spend"
        value={`$${(totalSpend?.data?.totalSpend || 0).toLocaleString()}`}
        subtitle={`${totalSpend?.data?.employeeCount || 0} employees`}
      />
      <StatsCard
        title="Average Salary"
        value={`$${(totalSpend?.data?.averageSalary || 0).toLocaleString()}`}
        subtitle="Across organization"
      />
      <StatsCard
        title="Total Employees"
        value={totalEmployees}
        subtitle={`${empCount?.data?.activePercentage || 0}% active`}
      />
      <StatsCard
        title="Avg by Department"
        value={`$${avgDept.toLocaleString()}`}
        subtitle={deptAvg?.data?.[0]?.department || 'N/A'}
      />
    </div>
  );
}
