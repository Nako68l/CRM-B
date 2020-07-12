import {Gender} from "../../enums/gender.enum";
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Employee extends Document {
    @Prop()
    fullName: string;

    @Prop()
    position: Position;

    @Prop()
    birthday: Date;

    @Prop()
    gender: Gender;

    @Prop()
    contactInformation: string;

    @Prop()
    salary: number;

    @Prop({default: new Date()})
    createdAt: Date
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
