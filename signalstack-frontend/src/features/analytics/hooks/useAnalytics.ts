import { useQuery } from '@tanstack/react-query';
import { AnalyticsService } from '@/services/analytics.service';

export const useTotalSpend = () => {
  return useQuery({
    queryKey: ['analytics', 'total-spend'],
    queryFn: () => AnalyticsService.getTotalSpend(),
  });
};

export const useAvgByDepartment = () => {
  return useQuery({
    queryKey: ['analytics', 'avg-by-department'],
    queryFn: () => AnalyticsService.getAvgByDepartment(),
  });
};

export const useAvgByCountry = () => {
  return useQuery({
    queryKey: ['analytics', 'avg-by-country'],
    queryFn: () => AnalyticsService.getAvgByCountry(),
  });
};

export const useSalaryDistribution = () => {
  return useQuery({
    queryKey: ['analytics', 'salary-distribution'],
    queryFn: () => AnalyticsService.getSalaryDistribution(),
  });
};

export const useEmployeeCount = () => {
  return useQuery({
    queryKey: ['analytics', 'employee-count'],
    queryFn: () => AnalyticsService.getEmployeeCount(),
  });
};
