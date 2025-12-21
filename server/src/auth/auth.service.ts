import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {AdminsService} from "../admins/admins.service";
import {JwtService} from "@nestjs/jwt";
import {CreateAdminDto} from "../admins/dto/create-admin.dto";
import {Admin} from "../admins/admins.model";
import * as bcrypt from 'bcrypt';
import * as process from "node:process";
import {Request, Response} from 'express';

@Injectable()
export class AuthService {

    constructor(private adminsService: AdminsService,
                private jwtService: JwtService) {
    }

    async refresh(request: Request, response: Response) {
        const refreshToken = request.cookies.refreshToken;
        if (!refreshToken) {
            throw new HttpException('token empty', HttpStatus.UNAUTHORIZED);
        }
        const admin = await this.adminsService.getAdminByRefreshToken(refreshToken);
        if (!admin) {
            throw new HttpException('admin with token not found', HttpStatus.UNAUTHORIZED);
        }


        try {
            this.jwtService.verify(refreshToken);
            const newRefreshToken = await this.generateRefreshToken(admin);
            const newAccessToken = await this.generateAccessToken(admin);
            await this.adminsService.updateRefreshToken(admin.login, newRefreshToken);
            response.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                admin: {
                    login: admin.login,
                    id: admin.id,
                },
            };
        } catch (e) {
            response.cookie('refreshToken', '', {
                httpOnly: true,
                maxAge: 0,
            });
            throw new HttpException('refresh token deprecated', HttpStatus.UNAUTHORIZED);
        }
    }

    async login(adminDto: CreateAdminDto, response: Response) {
        const admin = await this.validateAdmin(adminDto);

        const accessToken = await this.generateAccessToken(admin);
        const refreshToken = await this.generateRefreshToken(admin);

        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        await this.adminsService.updateRefreshToken(admin.login, refreshToken);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            admin: {
                login: admin.login,
                id: admin.id,
            },
        };
    }

    async generateAccessToken(admin: Admin) {
        const payload = {login: admin.login, id: admin.id}
        return this.jwtService.sign(payload, { secret: process.env.JWT_ACCESS_SECRET_TOKEN_KEY, expiresIn: '15m'});
    }

    async generateRefreshToken(admin: Admin) {
        const payload = {login: admin.login, id: admin.id}
        return this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET_TOKEN_KEY, expiresIn: '24h'});
    }

    private async validateAdmin(adminDto: CreateAdminDto) {
        const admin = await this.adminsService.getAdminByLogin(adminDto.login);
        if (!admin) {
            throw new HttpException('admin with the login not found', HttpStatus.BAD_REQUEST);
        }

        const passwordEquals = await bcrypt.compare(adminDto.password, admin.password);

        if (!passwordEquals) {
            throw new HttpException('invalid password', HttpStatus.BAD_REQUEST);
        }

        return admin;
    }
}
