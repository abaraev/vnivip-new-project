import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AdminsService} from "./admins.service";
import {CreateAdminDto} from "./dto/create-admin.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('admins')
export class AdminsController {
    constructor(private adminsService: AdminsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateAdminDto) {
        return this.adminsService.create(dto);
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.adminsService.getAll();
    }
}
