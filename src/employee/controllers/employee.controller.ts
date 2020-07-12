import { Controller, Get } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';
import { Employee } from '../schemas/employee.schema';

const prefix = Employee.name.toLowerCase() + 's'
@Controller(prefix)
export class EmployeeController {

  constructor(private employeesRepository: EmployeeRepository){}

  @Get()
  async findAllEmployees(): Promise<Employee[]> {
    return this.employeesRepository.findAll();
  }
}
