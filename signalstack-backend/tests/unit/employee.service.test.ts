import { EmployeeService } from '../../../src/modules/employee/employee.service';
import { EmployeeRepository } from '../../../src/modules/employee/employee.repository';
import { ConflictError, NotFoundError } from '../../../src/utils/errors';

jest.mock('../../../src/modules/employee/employee.repository');

describe('EmployeeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createEmployee', () => {
    it('should successfully create an employee', async () => {
      const mockEmployeeData = {
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        department: 'Engineering',
        role: 'Software Engineer',
        country: 'US',
        salary: 100000,
        currency: 'USD',
        employmentStatus: 'ACTIVE',
        joiningDate: new Date('2023-01-01'),
      };

      const mockCreatedEmployee = {
        id: '1',
        ...mockEmployeeData,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (EmployeeRepository.findByEmployeeId as jest.Mock).mockResolvedValue(null);
      (EmployeeRepository.create as jest.Mock).mockResolvedValue(mockCreatedEmployee);

      const result = await EmployeeService.createEmployee(mockEmployeeData, 'manager-1');

      expect(result).toEqual(mockCreatedEmployee);
      expect(EmployeeRepository.create).toHaveBeenCalledWith(mockEmployeeData, 'manager-1');
    });

    it('should throw ConflictError if employee ID already exists', async () => {
      const mockEmployeeData = {
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        department: 'Engineering',
        role: 'Software Engineer',
        country: 'US',
        salary: 100000,
        currency: 'USD',
        employmentStatus: 'ACTIVE',
        joiningDate: new Date('2023-01-01'),
      };

      (EmployeeRepository.findByEmployeeId as jest.Mock).mockResolvedValue({
        id: '1',
        ...mockEmployeeData,
        isDeleted: false,
      });

      await expect(
        EmployeeService.createEmployee(mockEmployeeData, 'manager-1')
      ).rejects.toThrow(ConflictError);
    });
  });

  describe('getEmployeeById', () => {
    it('should return employee when found', async () => {
      const mockEmployee = {
        id: '1',
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        department: 'Engineering',
        role: 'Software Engineer',
        country: 'US',
        salary: 100000,
        currency: 'USD',
        employmentStatus: 'ACTIVE',
        joiningDate: new Date('2023-01-01'),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (EmployeeRepository.findById as jest.Mock).mockResolvedValue(mockEmployee);

      const result = await EmployeeService.getEmployeeById('1');

      expect(result).toEqual(mockEmployee);
      expect(EmployeeRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when employee not found', async () => {
      (EmployeeRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(EmployeeService.getEmployeeById('999')).rejects.toThrow(
        NotFoundError
      );
    });

    it('should throw NotFoundError for deleted employee', async () => {
      const mockEmployee = {
        id: '1',
        isDeleted: true,
      };

      (EmployeeRepository.findById as jest.Mock).mockResolvedValue(mockEmployee);

      await expect(EmployeeService.getEmployeeById('1')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('softDeleteEmployee', () => {
    it('should successfully soft delete an employee', async () => {
      const mockEmployee = {
        id: '1',
        employeeId: 'EMP001',
        isDeleted: false,
      };

      (EmployeeRepository.findById as jest.Mock).mockResolvedValue(mockEmployee);
      (EmployeeRepository.softDelete as jest.Mock).mockResolvedValue({
        ...mockEmployee,
        isDeleted: true,
      });

      const result = await EmployeeService.softDeleteEmployee('1', 'manager-1');

      expect(result.isDeleted).toBe(true);
      expect(EmployeeRepository.softDelete).toHaveBeenCalledWith('1', 'manager-1');
    });
  });
});
