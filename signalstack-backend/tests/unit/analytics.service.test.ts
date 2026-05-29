import { AnalyticsService } from '../../../src/modules/analytics/analytics.service';
import { AnalyticsRepository } from '../../../src/modules/analytics/analytics.repository';

jest.mock('../../../src/modules/analytics/analytics.repository');

describe('AnalyticsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTotalCompensationSpend', () => {
    it('should calculate total compensation spend', async () => {
      const mockData = {
        totalSpend: 5000000,
        employeeCount: 100,
        averageSalary: 50000,
      };

      (AnalyticsRepository.getTotalCompensationSpend as jest.Mock).mockResolvedValue(mockData);

      const result = await AnalyticsService.getTotalCompensationSpend();

      expect(result.totalSpend).toBe(5000000);
      expect(result.employeeCount).toBe(100);
      expect(result.averageSalary).toBe(50000);
      expect(result.currency).toBe('USD');
    });
  });

  describe('getAverageSalaryByDepartment', () => {
    it('should return average salary grouped by department', async () => {
      const mockData = [
        {
          department: 'Engineering',
          averageSalary: 120000,
          employeeCount: 50,
          totalSalary: 6000000,
        },
        {
          department: 'Sales',
          averageSalary: 80000,
          employeeCount: 30,
          totalSalary: 2400000,
        },
      ];

      (AnalyticsRepository.getAverageSalaryByDepartment as jest.Mock).mockResolvedValue(mockData);

      const result = await AnalyticsService.getAverageSalaryByDepartment();

      expect(result).toHaveLength(2);
      expect(result[0].department).toBe('Engineering');
      expect(result[0].averageSalary).toBe(120000);
    });
  });

  describe('getSalaryDistribution', () => {
    it('should calculate salary distribution percentiles', async () => {
      const mockData = {
        min: 30000,
        max: 250000,
        average: 85000,
        median: 75000,
        percentile25: 50000,
        percentile75: 120000,
        percentile95: 200000,
      };

      (AnalyticsRepository.getSalaryDistribution as jest.Mock).mockResolvedValue(mockData);

      const result = await AnalyticsService.getSalaryDistribution();

      expect(result.min).toBe(30000);
      expect(result.max).toBe(250000);
      expect(result.percentile95).toBe(200000);
    });
  });

  describe('getEmployeeCount', () => {
    it('should return employee count statistics', async () => {
      const mockData = {
        active: 850,
        inactive: 150,
        total: 1000,
        activePercentage: 85,
        inactivePercentage: 15,
      };

      (AnalyticsRepository.getEmployeeCount as jest.Mock).mockResolvedValue(mockData);

      const result = await AnalyticsService.getEmployeeCount();

      expect(result.active).toBe(850);
      expect(result.inactive).toBe(150);
      expect(result.total).toBe(1000);
      expect(result.activePercentage).toBe(85);
    });
  });

  describe('getTopEarners', () => {
    it('should return top earners list', async () => {
      const mockData = [
        {
          id: '1',
          employeeId: 'EMP001',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          department: 'Engineering',
          role: 'VP Engineering',
          salary: 250000,
          currency: 'USD',
          joiningDate: new Date('2020-01-01'),
        },
      ];

      (AnalyticsRepository.getTopEarners as jest.Mock).mockResolvedValue(mockData);

      const result = await AnalyticsService.getTopEarners(10);

      expect(result).toHaveLength(1);
      expect(result[0].salary).toBe(250000);
    });
  });

  describe('getHighestPayrollCountries', () => {
    it('should return countries with highest payroll', async () => {
      const mockData = [
        {
          country: 'US',
          totalPayroll: 3000000,
          employeeCount: 300,
          averageSalary: 100000,
        },
        {
          country: 'UK',
          totalPayroll: 1500000,
          employeeCount: 150,
          averageSalary: 100000,
        },
      ];

      (AnalyticsRepository.getHighestPayrollCountries as jest.Mock).mockResolvedValue(mockData);

      const result = await AnalyticsService.getHighestPayrollCountries(5);

      expect(result).toHaveLength(2);
      expect(result[0].country).toBe('US');
      expect(result[0].totalPayroll).toBe(3000000);
    });
  });
});
