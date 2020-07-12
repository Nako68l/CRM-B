import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {MONGO_CONNECTION} from "./db-config";
import { EmployeeModule } from './employee/employee.module';
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION),
    EmployeeModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
