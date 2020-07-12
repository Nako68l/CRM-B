import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Auth} from "./auth.schema";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthRepository {

    constructor(
        @InjectModel(Auth.name) private authModel: Model<Auth>,
        private jwtService: JwtService,
    ) {
    }

    async register({login, password}: Auth): Promise<{ accessToken: string }> {
        const existingUser = await this.authModel.findOne({login})
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const newUser = new this.authModel()
        newUser.login = login;
        newUser.salt = await bcrypt.genSalt();
        newUser.password = await AuthRepository.hashPassword(password, newUser.salt);

        await newUser.save();

        const payload = {login: newUser.login};
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken};
    }

    async login(creds: Auth): Promise<{ accessToken: string } | void> {
        const login = await this.validateUserPassword(creds);

        if (!login) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {login};
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken};
    }

    private async validateUserPassword({login, password}: Auth): Promise<string> {
        const user = await this.authModel.findOne({login});

        if (user && await this.validatePassword(user, password)) {
            return user.login;
        } else {
            return null;
        }
    }


    private async validatePassword(user: Auth, password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, user.salt);
        return hash === user.password;
    }

    private static async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
