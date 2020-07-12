import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';
import { Employee } from '../schemas/employee.schema';

const prefix = Employee.name.toLowerCase() + 's'
@Controller(prefix)
export class EmployeeController {

  constructor(private employeesRepository: EmployeeRepository){}

  @Get()
  findAllEmployees(): Promise<Employee[]> {
    return this.employeesRepository.findAll();
  }

  @Post()
  createEmployee(@Body() employee: Employee): Promise<Employee> {
    return this.employeesRepository.createOne(employee);
  }

  @Delete(':employeeId')
  deleteEmployee(@Param('employeeId') employeeId: string): Promise<Employee> {
    return this.employeesRepository.deleteOne(employeeId);
  }
}
