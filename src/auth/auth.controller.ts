import {Body, Controller, Post} from '@nestjs/common';
import {Auth} from "./auth.schema";
import {AuthRepository} from "./auth.repository";

const prefix = Auth.name.toLowerCase()
@Controller(prefix)
export class AuthController {

    constructor(private authRepository: AuthRepository) {}

    @Post('register')
    async register(@Body() creds: Auth) {
        return this.authRepository.register(creds);
    }


    @Post('login')
    async login(@Body() creds: Auth) {
        return this.authRepository.login(creds);
    }
}













