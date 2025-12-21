import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {AdminsModule} from "../admins/admins.module";
import * as process from "node:process";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
    imports: [
        forwardRef(() => AdminsModule),
        JwtModule.register({
            secret: process.env.JWT_DEFAULT_TOKEN_SECRET_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
  exports: [
      AuthService,
      JwtModule,
  ]
})
export class AuthModule {}
