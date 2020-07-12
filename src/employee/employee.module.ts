import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema, Employee } from './schemas/employee.schema';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeRepository } from './repositories/employee.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema }
    ])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeRepository]
})
export class EmployeeModule {}
