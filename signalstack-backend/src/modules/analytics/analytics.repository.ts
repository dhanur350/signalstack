import { prisma } from '../../config/database';
import { Prisma } from '@prisma/client';

export class AnalyticsRepository {
  static async getTotalCompensationSpend() {
    const result = await prisma.employee.aggregate({
      where: { isDeleted: false },
      _sum: {
        salary: true,
      },
      _count: true,
      _avg: {
        salary: true,
      },
    });

    return {
      totalSpend: result._sum.salary ? Number(result._sum.salary) : 0,
      employeeCount: result._count,
      averageSalary: result._avg.salary ? Number(result._avg.salary) : 0,
    };
  }

  static async getAverageSalaryByDepartment() {
    const result = await prisma.employee.groupBy({
      by: ['department'],
      where: { isDeleted: false },
      _sum: {
        salary: true,
      },
      _count: true,
      _avg: {
        salary: true,
      },
      orderBy: {
        _avg: {
          salary: 'desc',
        },
      },
    });

    return result.map((item) => ({
      department: item.department,
      averageSalary: item._avg.salary ? Number(item._avg.salary) : 0,
      employeeCount: item._count,
      totalSalary: item._sum.salary ? Number(item._sum.salary) : 0,
    }));
  }

  static async getAverageSalaryByCountry() {
    const result = await prisma.employee.groupBy({
      by: ['country'],
      where: { isDeleted: false },
      _sum: {
        salary: true,
      },
      _count: true,
      _avg: {
        salary: true,
      },
      orderBy: {
        _avg: {
          salary: 'desc',
        },
      },
    });

    return result.map((item) => ({
      country: item.country,
      averageSalary: item._avg.salary ? Number(item._avg.salary) : 0,
      employeeCount: item._count,
      totalSalary: item._sum.salary ? Number(item._sum.salary) : 0,
    }));
  }

  static async getHighestPaidDepartments(limit: number = 5) {
    const result = await prisma.employee.groupBy({
      by: ['department'],
      where: { isDeleted: false },
      _sum: {
        salary: true,
      },
      _count: true,
      _avg: {
        salary: true,
      },
      orderBy: {
        _avg: {
          salary: 'desc',
        },
      },
      take: limit,
    });

    return result.map((item) => ({
      department: item.department,
      averageSalary: item._avg.salary ? Number(item._avg.salary) : 0,
      employeeCount: item._count,
      totalSalary: item._sum.salary ? Number(item._sum.salary) : 0,
    }));
  }

  static async getSalaryDistribution() {
    // Get all salaries
    const employees = await prisma.employee.findMany({
      where: { isDeleted: false },
      select: {
        salary: true,
      },
      orderBy: {
        salary: 'asc',
      },
    });

    if (employees.length === 0) {
      return {
        min: 0,
        max: 0,
        average: 0,
        median: 0,
        percentile25: 0,
        percentile75: 0,
        percentile95: 0,
      };
    }

    const salaries = employees.map((e) => Number(e.salary));
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);
    const average = salaries.reduce((a, b) => a + b, 0) / salaries.length;

    // Calculate percentiles
    const sorted = [...salaries].sort((a, b) => a - b);
    const getPercentile = (p: number) => {
      const index = Math.ceil((p / 100) * sorted.length) - 1;
      return sorted[Math.max(0, index)];
    };

    return {
      min,
      max,
      average,
      median: getPercentile(50),
      percentile25: getPercentile(25),
      percentile75: getPercentile(75),
      percentile95: getPercentile(95),
    };
  }

  static async getEmployeeCount() {
    const [active, inactive, total] = await Promise.all([
      prisma.employee.count({
        where: { isDeleted: false, employmentStatus: 'ACTIVE' },
      }),
      prisma.employee.count({
        where: { isDeleted: false, employmentStatus: 'INACTIVE' },
      }),
      prisma.employee.count({
        where: { isDeleted: false },
      }),
    ]);

    return {
      active,
      inactive,
      total,
      activePercentage: total > 0 ? (active / total) * 100 : 0,
      inactivePercentage: total > 0 ? (inactive / total) * 100 : 0,
    };
  }

  static async getTopEarners(limit: number = 10) {
    return prisma.employee.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        employeeId: true,
        firstName: true,
        lastName: true,
        email: true,
        department: true,
        role: true,
        salary: true,
        currency: true,
        joiningDate: true,
      },
      orderBy: {
        salary: 'desc',
      },
      take: limit,
    });
  }

  static async getTopEarnersByDepartment(department: string, limit: number = 5) {
    return prisma.employee.findMany({
      where: { isDeleted: false, department },
      select: {
        id: true,
        employeeId: true,
        firstName: true,
        lastName: true,
        email: true,
        department: true,
        role: true,
        salary: true,
        currency: true,
        joiningDate: true,
      },
      orderBy: {
        salary: 'desc',
      },
      take: limit,
    });
  }

  static async getEmployeesAboveSalary(salary: number) {
    return prisma.employee.findMany({
      where: { isDeleted: false, salary: { gte: salary } },
      select: {
        id: true,
        employeeId: true,
        firstName: true,
        lastName: true,
        email: true,
        department: true,
        salary: true,
      },
      orderBy: {
        salary: 'desc',
      },
    });
  }

  static async getHighestPayrollCountries(limit: number = 5) {
    const result = await prisma.employee.groupBy({
      by: ['country'],
      where: { isDeleted: false },
      _sum: {
        salary: true,
      },
      _count: true,
      orderBy: {
        _sum: {
          salary: 'desc',
        },
      },
      take: limit,
    });

    return result.map((item) => ({
      country: item.country,
      totalPayroll: item._sum.salary ? Number(item._sum.salary) : 0,
      employeeCount: item._count,
      averageSalary: item._sum.salary && item._count ? Number(item._sum.salary) / item._count : 0,
    }));
  }

  static async getSalaryGrowthByTenure() {
    // Group by tenure ranges and calculate average salary
    const employees = await prisma.employee.findMany({
      where: { isDeleted: false },
      select: {
        salary: true,
        joiningDate: true,
      },
    });

    const now = new Date();
    const tenureGroups = {
      '0-1 years': 0,
      '1-3 years': 0,
      '3-5 years': 0,
      '5-10 years': 0,
      '10+ years': 0,
    };

    let counts = {
      '0-1 years': 0,
      '1-3 years': 0,
      '3-5 years': 0,
      '5-10 years': 0,
      '10+ years': 0,
    };

    employees.forEach((emp) => {
      const tenureYears =
        (now.getTime() - emp.joiningDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      const salary = Number(emp.salary);

      if (tenureYears < 1) {
        tenureGroups['0-1 years'] += salary;
        counts['0-1 years']++;
      } else if (tenureYears < 3) {
        tenureGroups['1-3 years'] += salary;
        counts['1-3 years']++;
      } else if (tenureYears < 5) {
        tenureGroups['3-5 years'] += salary;
        counts['3-5 years']++;
      } else if (tenureYears < 10) {
        tenureGroups['5-10 years'] += salary;
        counts['5-10 years']++;
      } else {
        tenureGroups['10+ years'] += salary;
        counts['10+ years']++;
      }
    });

    return Object.keys(tenureGroups).map((tenure) => ({
      tenure,
      averageSalary:
        counts[tenure as keyof typeof counts] > 0
          ? tenureGroups[tenure as keyof typeof tenureGroups] /
            counts[tenure as keyof typeof counts]
          : 0,
      employeeCount: counts[tenure as keyof typeof counts],
    }));
  }
}
