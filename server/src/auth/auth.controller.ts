import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateAdminDto} from "../admins/dto/create-admin.dto";
import {Request, Response} from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() adminDto: CreateAdminDto,
          @Res({ passthrough: true }) response: Response) {
        return this.authService.login(adminDto, response)
    }

    @Get('/refresh')
    refresh(@Req() request: Request,
            @Res({ passthrough: true }) response: Response) {
        return this.authService.refresh(request, response);
    }
}
