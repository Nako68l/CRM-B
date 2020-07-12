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

    // @Post()
    // async login(@Body("email") email:string,
    //     @Body("password") plaintextPassword:string) {
    //
    //     const user = await this.userModel.findOne({email});
    //
    //     if(!user) {
    //         console.log("User does exist on the database.");
    //         throw new UnauthorizedException();
    //     }
    //
    //     return new Promise((resolve, reject) => {
    //         password(plaintextPassword).verifyAgainst(
    //             user.passwordHash,
    //             (err, verified) => {
    //                 if (!verified) {
    //                     reject(new UnauthorizedException());
    //                 }
    //
    //                 const authJwtToken =
    //                     jwt.sign({email, roles: user.roles},
    //                         JWT_SECRET);
    //
    //                 resolve({authJwtToken});
    //             }
    //         );
    //     });
    // }

}













