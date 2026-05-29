import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from './analytics.service';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';

export class AnalyticsController {
  static async getTotalCompensationSpend(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AnalyticsService.getTotalCompensationSpend();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAverageSalaryByDepartment(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AnalyticsService.getAverageSalaryByDepartment();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAverageSalaryByCountry(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AnalyticsService.getAverageSalaryByCountry();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getHighestPaidDepartments(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const result = await AnalyticsService.getHighestPaidDepartments(limit);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSalaryDistribution(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AnalyticsService.getSalaryDistribution();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getEmployeeCount(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AnalyticsService.getEmployeeCount();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTopEarners(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const result = await AnalyticsService.getTopEarners(limit);

      res.status(200).json({
        success: true,
        data: result,
        count: result.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTopEarnersByDepartment(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { department } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const result = await AnalyticsService.getTopEarnersByDepartment(department, limit);

      res.status(200).json({
        success: true,
        data: result,
        count: result.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getEmployeesAboveSalary(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const salary = req.query.salary ? parseFloat(req.query.salary as string) : 0;

      if (!salary || salary < 0) {
        return res.status(400).json({
          success: false,
          error: 'Valid salary parameter is required',
        });
      }

      const result = await AnalyticsService.getEmployeesAboveSalary(salary);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getHighestPayrollCountries(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const result = await AnalyticsService.getHighestPayrollCountries(limit);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSalaryGrowthByTenure(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AnalyticsService.getSalaryGrowthByTenure();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
