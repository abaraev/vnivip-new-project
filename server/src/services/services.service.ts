import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateServiceDto} from "./dto/create-service.dto";
import {FilesService} from "../files/files.service";
import {Service} from "./services.model";
import {GetServicesPartDto} from "./dto/get-services-part.dto";
import {Op} from "sequelize";
import {GetServiceOneDto} from "./dto/get-service-one.dto";
import {ChangeNameServiceDto} from "./dto/change-name-service.dto";
import {ChangePriceServiceDto} from "./dto/change-price-service.dto";
import {DeleteCoverServiceDto} from "./dto/delete-cover-service.dto";
import {ChangeCoverServiceDto} from "./dto/change-cover-service.dto";
import {DeleteServiceDto} from "./dto/delete-service.dto";

@Injectable()
export class ServicesService {
    constructor(@InjectModel(Service) private servicesRepository: typeof Service,
                private fileService: FilesService) {}

    async create(dto: CreateServiceDto, files: { coverImg?: Express.Multer.File[] }) {
        const coverImg = files?.coverImg?.[0];
        const data: CreateServiceDto = {
            price: dto.price,
            name: dto.name,
        }

        if (coverImg) {
            data.coverImg = await this.fileService.createImage(coverImg);
        }

        const service = await this.servicesRepository.create(data)

        return service;
    }

    async getAll() {
        return this.servicesRepository.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    async getPart(dto: GetServicesPartDto) {
        const regex = /^\d+(\s*,\s*\d+)*$/;
        if (!regex.test(dto.ids)) {
            throw new HttpException('incorrect ids', HttpStatus.BAD_REQUEST);
        }

        const ids = dto.ids.split(',').map((id) => Number(id));

        const services = await this.servicesRepository.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                }
            }
        })

        return services;
    }

    async getOne(dto: GetServiceOneDto) {
        const service = await this.servicesRepository.findOne({ where: { id: dto.serviceId }});

        if (!service) {
            throw new HttpException('service not found', HttpStatus.BAD_REQUEST);
        }

        return service;
    }

    async changeName(dto: ChangeNameServiceDto) {
        const service = await this.servicesRepository.findOne({ where: { id: dto.serviceId }});

        if (!service) {
            throw new HttpException('service not found', HttpStatus.BAD_REQUEST);
        }

        await service.update({ name: dto.name });

        return service;
    }

    async changePrice(dto: ChangePriceServiceDto) {
        const service = await this.servicesRepository.findOne({ where: { id: dto.serviceId }});

        if (!service) {
            throw new HttpException('service not found', HttpStatus.BAD_REQUEST);
        }

        await service.update({ price: Number(dto.price) });

        return service;
    }

    async deleteCover(dto: DeleteCoverServiceDto) {
        const service = await this.servicesRepository.findOne({ where: { id: dto.serviceId }});

        if (!service) {
            throw new HttpException('service not found', HttpStatus.BAD_REQUEST);
        }

        if (!service.coverImg) {
            return service;
        }

        await this.fileService.deleteImage(service.coverImg);
        await service.update({ coverImg: null });

        return service;
    }

    async delete(dto: DeleteServiceDto) {
        const service = await this.servicesRepository.findOne({ where: { id: dto.serviceId }});

        if (!service) {
            throw new HttpException('service not found', HttpStatus.BAD_REQUEST);
        }

        await service.destroy();

        return service;
    }

    async changeCover(dto: ChangeCoverServiceDto, files: { coverImg?: Express.Multer.File[] }) {
        const coverImg = files?.coverImg?.[0];

        if (!coverImg) {
            throw new HttpException('required coverImg', HttpStatus.BAD_REQUEST);
        }

        const service = await this.servicesRepository.findOne({ where: { id: dto.serviceId }});

        if (!service) {
            throw new HttpException('service not found', HttpStatus.BAD_REQUEST);
        }

        if (service.coverImg) {
            await this.fileService.deleteImage(service.coverImg);
        }

        const fileName = await this.fileService.createImage(coverImg);
        await service.update({ coverImg: fileName });

        return {
            fileName,
        };
    }
}
