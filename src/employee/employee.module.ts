import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema, Employee } from './schemas/employee.schema';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeRepository } from './repositories/employee.repository';
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema }
    ]),
    AuthModule
  ],
  controllers: [EmployeeController],
  providers: [EmployeeRepository]
})
export class EmployeeModule {}
