import { prisma } from '../../config/database';
import { CreateEmployeeRequest, UpdateEmployeeRequest, EmployeeFilterRequest } from './employee.schemas';
import { Prisma } from '@prisma/client';

export class EmployeeRepository {
  static async create(data: CreateEmployeeRequest, managerId: string) {
    return prisma.employee.create({
      data: {
        ...data,
        createdById: managerId,
        updatedById: managerId,
      },
    });
  }

  static async findById(id: string) {
    return prisma.employee.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  static async findByEmployeeId(employeeId: string) {
    return prisma.employee.findUnique({
      where: { employeeId },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  static async findAll(filters: EmployeeFilterRequest) {
    const {
      page,
      limit,
      department,
      country,
      role,
      status,
      minSalary,
      maxSalary,
      search,
      sortBy,
      sortOrder,
    } = filters;

    const offset = (page - 1) * limit;

    // Build where clause
    const whereClause: Prisma.EmployeeWhereInput = {
      isDeleted: false,
      ...(department && { department: { equals: department, mode: 'insensitive' } }),
      ...(country && { country: { equals: country, mode: 'insensitive' } }),
      ...(role && { role: { equals: role, mode: 'insensitive' } }),
      ...(status && { employmentStatus: status }),
      ...(minSalary || maxSalary) && {
        salary: {
          ...(minSalary && { gte: minSalary }),
          ...(maxSalary && { lte: maxSalary }),
        },
      },
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { employeeId: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    // Fetch employees and total count
    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder.toLowerCase() as Prisma.SortOrder,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          updatedBy: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      prisma.employee.count({ where: whereClause }),
    ]);

    return {
      employees,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async update(id: string, data: UpdateEmployeeRequest, managerId: string) {
    return prisma.employee.update({
      where: { id },
      data: {
        ...data,
        updatedById: managerId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  static async softDelete(id: string, managerId: string) {
    return prisma.employee.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        updatedById: managerId,
      },
    });
  }

  static async restore(id: string, managerId: string) {
    return prisma.employee.update({
      where: { id },
      data: {
        isDeleted: false,
        deletedAt: null,
        updatedById: managerId,
      },
    });
  }

  static async delete(id: string) {
    return prisma.employee.delete({
      where: { id },
    });
  }

  static async countByDepartment() {
    return prisma.employee.groupBy({
      by: ['department'],
      where: { isDeleted: false },
      _count: true,
    });
  }

  static async countByCountry() {
    return prisma.employee.groupBy({
      by: ['country'],
      where: { isDeleted: false },
      _count: true,
    });
  }
}
