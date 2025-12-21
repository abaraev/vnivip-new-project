import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Admin} from "./admins.model";
import {CreateAdminDto} from "./dto/create-admin.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {

    constructor(@InjectModel(Admin) private adminRepository: typeof Admin) {}

    async create(dto: CreateAdminDto) {
        const duplicate = await this.adminRepository.findOne({
            where: {
                login: dto.login,
            }
        })

        if (duplicate) {
            throw new HttpException('admin with the login already exists', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(dto.password, 5);

        return await this.adminRepository.create({login: dto.login, password: hashPassword});
    }

    async getAll() {
        return await this.adminRepository.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
    }

    async getAdminByLogin(login: string) {
        const admin = await this.adminRepository.findOne({
            where: {
                login: login,
            }
        })
        return admin;
    }

    async getAdminByRefreshToken(token: string) {
        const admin = await this.adminRepository.findOne({
            where: {
                refreshToken: token,
            }
        })
        return admin;
    }

    async updateRefreshToken(login: string, token: string) {
        return await this.adminRepository.update({ refreshToken: token }, { where: { login: login } })
    }
}