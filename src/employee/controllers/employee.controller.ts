import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';
import { Employee } from '../schemas/employee.schema';
import {AuthGuard} from "@nestjs/passport";

const prefix = Employee.name.toLowerCase() + 's'
@Controller(prefix)
@UseGuards(AuthGuard('jwt'))
export class EmployeeController {

  constructor(private employeesRepository: EmployeeRepository){}

  @Get()
  findAllEmployees(): Promise<Employee[]> {
    return this.employeesRepository.findAll();
  }

  @Post()
  createEmployee(@Body() employee: Employee): Promise<Employee> {
    return this.employeesRepository.create(employee);
  }

  @Put(':employeeId')
  updateEmployee(@Param('employeeId') employeeId: string, @Body() employee: Employee): Promise<Employee> {
    return this.employeesRepository.update(employeeId, employee);
  }

  @Delete(':employeeId')
  deleteEmployee(@Param('employeeId') employeeId: string): Promise<Employee> {
    return this.employeesRepository.delete(employeeId);
  }
}
