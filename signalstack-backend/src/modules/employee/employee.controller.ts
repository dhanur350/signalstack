import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from './employee.service';
import { createEmployeeSchema, updateEmployeeSchema, employeeFilterSchema } from './employee.schemas';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';
import { logger } from '../../utils/logger';

export class EmployeeController {
  static async createEmployee(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = createEmployeeSchema.parse(req.body);
      const employee = await EmployeeService.createEmployee(data, req.managerId!);

      res.status(201).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getEmployeeById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const employee = await EmployeeService.getEmployeeById(id);

      res.status(200).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getEmployees(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const filters = employeeFilterSchema.parse(req.query);
      const result = await EmployeeService.getEmployees(filters);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateEmployee(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const data = updateEmployeeSchema.parse(req.body);
      const employee = await EmployeeService.updateEmployee(id, data, req.managerId!);

      res.status(200).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteEmployee(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      await EmployeeService.softDeleteEmployee(id, req.managerId!);

      res.status(200).json({
        success: true,
        message: 'Employee deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async restoreEmployee(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const employee = await EmployeeService.restoreEmployee(id, req.managerId!);

      res.status(200).json({
        success: true,
        data: employee,
        message: 'Employee restored successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getEmployeesByDepartment(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { department } = req.params;
      const result = await EmployeeService.getEmployeesByDepartment(department);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchEmployees(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Search query is required',
        });
      }

      const result = await EmployeeService.searchEmployees(q);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}
