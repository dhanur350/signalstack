import { Router } from 'express';
import { EmployeeController } from './employee.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// All employee routes require authentication
router.use(authMiddleware);

// CRUD operations
router.post('/', EmployeeController.createEmployee);
router.get('/', EmployeeController.getEmployees);
router.get('/search', EmployeeController.searchEmployees);
router.get('/department/:department', EmployeeController.getEmployeesByDepartment);
router.get('/:id', EmployeeController.getEmployeeById);
router.put('/:id', EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);
router.post('/:id/restore', EmployeeController.restoreEmployee);

export const employeeRoutes = router;
