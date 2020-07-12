import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Auth} from "./auth.schema";
import {Model} from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(Auth.name) private authModel: Model<Auth>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'SuperSecret321',
        });
    }

    async validate(payload: Auth) {
        const {login} = payload;
        const user = await this.authModel.findOne({login});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
