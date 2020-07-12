import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class Auth extends Document {
    @Prop()
    login: string;

    @Prop()
    password: string;

    @Prop()
    salt: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
