import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Auth, AuthSchema} from './auth.schema';
import {AuthRepository} from "./auth.repository";


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Auth.name, schema: AuthSchema}
        ])
    ],
    controllers: [AuthController],
    providers: [AuthRepository]
})
export class AuthModule {

}
