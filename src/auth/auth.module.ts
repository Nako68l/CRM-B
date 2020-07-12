import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Auth, AuthSchema} from './auth.schema';
import {AuthRepository} from "./auth.repository";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";


@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: 'SuperSecret321',
            signOptions: {
                expiresIn: 3600
            }
        }),
        MongooseModule.forFeature([
            {name: Auth.name, schema: AuthSchema}
        ])
    ],
    controllers: [AuthController],
    providers: [
        AuthRepository,
        JwtStrategy,
    ],
    exports: [
        JwtStrategy,
        PassportModule,
    ]
})
export class AuthModule {

}
