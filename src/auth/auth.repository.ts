import {ConflictException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Auth} from "./auth.schema";

@Injectable()
export class AuthRepository {

    constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

    async register(creds: Auth): Promise<Auth> {
        const existingUser = await this.authModel.findOne({login: creds.login})
        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const newAuth = new this.authModel(creds)
        return newAuth.save()
    }

    async login(creds: Auth): Promise<Auth | void> {
        const user = await this.authModel.findOne(creds)
        if (!user) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}
