import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// All analytics routes require authentication
router.use(authMiddleware);

// Analytics endpoints
router.get('/total-spend', AnalyticsController.getTotalCompensationSpend);
router.get('/avg-by-department', AnalyticsController.getAverageSalaryByDepartment);
router.get('/avg-by-country', AnalyticsController.getAverageSalaryByCountry);
router.get('/highest-departments', AnalyticsController.getHighestPaidDepartments);
router.get('/salary-distribution', AnalyticsController.getSalaryDistribution);
router.get('/employee-count', AnalyticsController.getEmployeeCount);
router.get('/top-earners', AnalyticsController.getTopEarners);
router.get('/top-earners/:department', AnalyticsController.getTopEarnersByDepartment);
router.get('/above-salary', AnalyticsController.getEmployeesAboveSalary);
router.get('/highest-payroll-countries', AnalyticsController.getHighestPayrollCountries);
router.get('/salary-by-tenure', AnalyticsController.getSalaryGrowthByTenure);

export const analyticsRoutes = router;
