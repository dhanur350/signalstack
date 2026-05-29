import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeRequest, UpdateEmployeeRequest, EmployeeFilterRequest } from './employee.schemas';
import { ConflictError, NotFoundError } from '../../utils/errors';
import { logger } from '../../utils/logger';

export class EmployeeService {
  static async createEmployee(data: CreateEmployeeRequest, managerId: string) {
    try {
      // Check if employee with same ID or email already exists
      const [existingById, existingByEmail] = await Promise.all([
        EmployeeRepository.findByEmployeeId(data.employeeId),
        EmployeeRepository.findByEmployeeId(data.email), // Will need email search
      ]);

      if (existingById && !existingById.isDeleted) {
        throw new ConflictError(`Employee with ID ${data.employeeId} already exists`);
      }

      const employee = await EmployeeRepository.create(data, managerId);
      logger.info({ employeeId: employee.id }, 'Employee created');
      return employee;
    } catch (error) {
      if (error instanceof ConflictError) {
        throw error;
      }
      logger.error(error, 'Error creating employee');
      if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        throw new ConflictError('Email already exists');
      }
      throw error;
    }
  }

  static async getEmployeeById(id: string) {
    const employee = await EmployeeRepository.findById(id);

    if (!employee || employee.isDeleted) {
      throw new NotFoundError('Employee not found');
    }

    return employee;
  }

  static async getEmployees(filters: EmployeeFilterRequest) {
    const result = await EmployeeRepository.findAll(filters);
    return {
      data: result.employees,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    };
  }

  static async updateEmployee(id: string, data: UpdateEmployeeRequest, managerId: string) {
    try {
      // Check if employee exists
      const employee = await EmployeeRepository.findById(id);

      if (!employee || employee.isDeleted) {
        throw new NotFoundError('Employee not found');
      }

      const updatedEmployee = await EmployeeRepository.update(id, data, managerId);
      logger.info({ employeeId: id }, 'Employee updated');
      return updatedEmployee;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      logger.error(error, 'Error updating employee');
      if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        throw new ConflictError('Email already exists');
      }
      throw error;
    }
  }

  static async softDeleteEmployee(id: string, managerId: string) {
    try {
      // Check if employee exists
      const employee = await EmployeeRepository.findById(id);

      if (!employee || employee.isDeleted) {
        throw new NotFoundError('Employee not found');
      }

      const deletedEmployee = await EmployeeRepository.softDelete(id, managerId);
      logger.info({ employeeId: id }, 'Employee soft deleted');
      return deletedEmployee;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      logger.error(error, 'Error deleting employee');
      throw error;
    }
  }

  static async restoreEmployee(id: string, managerId: string) {
    try {
      const employee = await EmployeeRepository.findById(id);

      if (!employee || !employee.isDeleted) {
        throw new NotFoundError('Employee not found or already active');
      }

      const restoredEmployee = await EmployeeRepository.restore(id, managerId);
      logger.info({ employeeId: id }, 'Employee restored');
      return restoredEmployee;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      logger.error(error, 'Error restoring employee');
      throw error;
    }
  }

  static async getEmployeesByDepartment(department: string) {
    const filters: EmployeeFilterRequest = {
      page: 1,
      limit: 1000,
      department,
      sortBy: 'salary',
      sortOrder: 'DESC',
    };

    return this.getEmployees(filters);
  }

  static async getEmployeesByCountry(country: string) {
    const filters: EmployeeFilterRequest = {
      page: 1,
      limit: 1000,
      country,
      sortBy: 'salary',
      sortOrder: 'DESC',
    };

    return this.getEmployees(filters);
  }

  static async searchEmployees(searchTerm: string) {
    const filters: EmployeeFilterRequest = {
      page: 1,
      limit: 50,
      search: searchTerm,
      sortBy: 'firstName',
      sortOrder: 'ASC'
    };

    return this.getEmployees(filters);
  }
}
