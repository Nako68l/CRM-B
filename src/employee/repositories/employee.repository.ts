import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Employee} from "../schemas/employee.schema";

@Injectable()
export class EmployeeRepository {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

    async findAll(): Promise<Employee[]> {
        return this.employeeModel.find();
    }

    createOne(employee: Employee): Promise<Employee> {
        const newEmployee = new this.employeeModel(employee)
        return newEmployee.save()
    }

    async deleteOne(employeeId: string): Promise<Employee> {
        return this.employeeModel.findByIdAndDelete(employeeId);
    }
}
