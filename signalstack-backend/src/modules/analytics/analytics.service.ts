import { AnalyticsRepository } from './analytics.repository';
import { logger } from '../../utils/logger';

export class AnalyticsService {
  static async getTotalCompensationSpend() {
    try {
      const data = await AnalyticsRepository.getTotalCompensationSpend();
      logger.info('Total compensation spend calculated');
      return {
        totalSpend: data.totalSpend,
        currency: 'USD', // Could be made dynamic based on employees
        employeeCount: data.employeeCount,
        averageSalary: Math.round(data.averageSalary * 100) / 100,
      };
    } catch (error) {
      logger.error(error, 'Error calculating total compensation spend');
      throw error;
    }
  }

  static async getAverageSalaryByDepartment() {
    try {
      const data = await AnalyticsRepository.getAverageSalaryByDepartment();
      logger.info({ count: data.length }, 'Average salary by department calculated');
      return data.map((item) => ({
        ...item,
        averageSalary: Math.round(item.averageSalary * 100) / 100,
        totalSalary: Math.round(item.totalSalary * 100) / 100,
      }));
    } catch (error) {
      logger.error(error, 'Error calculating average salary by department');
      throw error;
    }
  }

  static async getAverageSalaryByCountry() {
    try {
      const data = await AnalyticsRepository.getAverageSalaryByCountry();
      logger.info({ count: data.length }, 'Average salary by country calculated');
      return data.map((item) => ({
        ...item,
        averageSalary: Math.round(item.averageSalary * 100) / 100,
        totalSalary: Math.round(item.totalSalary * 100) / 100,
      }));
    } catch (error) {
      logger.error(error, 'Error calculating average salary by country');
      throw error;
    }
  }

  static async getHighestPaidDepartments(limit: number = 5) {
    try {
      const data = await AnalyticsRepository.getHighestPaidDepartments(limit);
      logger.info({ count: data.length }, 'Highest paid departments calculated');
      return data.map((item) => ({
        ...item,
        averageSalary: Math.round(item.averageSalary * 100) / 100,
        totalSalary: Math.round(item.totalSalary * 100) / 100,
      }));
    } catch (error) {
      logger.error(error, 'Error calculating highest paid departments');
      throw error;
    }
  }

  static async getSalaryDistribution() {
    try {
      const data = await AnalyticsRepository.getSalaryDistribution();
      logger.info('Salary distribution calculated');
      return {
        min: Math.round(data.min * 100) / 100,
        max: Math.round(data.max * 100) / 100,
        average: Math.round(data.average * 100) / 100,
        median: Math.round(data.median * 100) / 100,
        percentile25: Math.round(data.percentile25 * 100) / 100,
        percentile75: Math.round(data.percentile75 * 100) / 100,
        percentile95: Math.round(data.percentile95 * 100) / 100,
      };
    } catch (error) {
      logger.error(error, 'Error calculating salary distribution');
      throw error;
    }
  }

  static async getEmployeeCount() {
    try {
      const data = await AnalyticsRepository.getEmployeeCount();
      logger.info(data, 'Employee count calculated');
      return {
        active: data.active,
        inactive: data.inactive,
        total: data.total,
        activePercentage: Math.round(data.activePercentage * 100) / 100,
        inactivePercentage: Math.round(data.inactivePercentage * 100) / 100,
      };
    } catch (error) {
      logger.error(error, 'Error calculating employee count');
      throw error;
    }
  }

  static async getTopEarners(limit: number = 10) {
    try {
      const data = await AnalyticsRepository.getTopEarners(limit);
      logger.info({ count: data.length }, 'Top earners calculated');
      return data;
    } catch (error) {
      logger.error(error, 'Error calculating top earners');
      throw error;
    }
  }

  static async getTopEarnersByDepartment(department: string, limit: number = 5) {
    try {
      const data = await AnalyticsRepository.getTopEarnersByDepartment(department, limit);
      logger.info({ department, count: data.length }, 'Top earners by department calculated');
      return data;
    } catch (error) {
      logger.error(error, 'Error calculating top earners by department');
      throw error;
    }
  }

  static async getEmployeesAboveSalary(salary: number) {
    try {
      const data = await AnalyticsRepository.getEmployeesAboveSalary(salary);
      logger.info({ minSalary: salary, count: data.length }, 'Employees above salary calculated');
      return {
        minSalary: salary,
        count: data.length,
        employees: data,
      };
    } catch (error) {
      logger.error(error, 'Error calculating employees above salary');
      throw error;
    }
  }

  static async getHighestPayrollCountries(limit: number = 5) {
    try {
      const data = await AnalyticsRepository.getHighestPayrollCountries(limit);
      logger.info({ count: data.length }, 'Highest payroll countries calculated');
      return data.map((item) => ({
        country: item.country,
        totalPayroll: Math.round(item.totalPayroll * 100) / 100,
        employeeCount: item.employeeCount,
        averageSalary: Math.round(item.averageSalary * 100) / 100,
      }));
    } catch (error) {
      logger.error(error, 'Error calculating highest payroll countries');
      throw error;
    }
  }

  static async getSalaryGrowthByTenure() {
    try {
      const data = await AnalyticsRepository.getSalaryGrowthByTenure();
      logger.info('Salary growth by tenure calculated');
      return data.map((item) => ({
        tenure: item.tenure,
        averageSalary: Math.round(item.averageSalary * 100) / 100,
        employeeCount: item.employeeCount,
      }));
    } catch (error) {
      logger.error(error, 'Error calculating salary growth by tenure');
      throw error;
    }
  }
}
