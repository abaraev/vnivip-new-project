import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateActDto} from "./dto/create-act.dto";
import {Act} from "./acts.model";
import {FilesService} from "../files/files.service";
import {CreateDocumentResult} from "../files/types/create-document-result";
import {DeleteActDto} from "./dto/delete-act.dto";
import {actTypes} from "./types/actTypes";
import {Op, or, Sequelize} from "sequelize";
import {CreateActOrderDto} from "./dto/create-act-order.dto";
import {CreateActCompetitionDto} from "./dto/create-act-competition.dto";
import {CreateActEducationDto} from "./dto/create-act-education.dto";
import {CreateActLibraryDto} from "./dto/create-act-library.dto";
import {CreateActClinicDto} from "./dto/create-act-clinic.dto";

@Injectable()
export class ActsService {
    constructor(@InjectModel(Act) private actsRepository: typeof Act,
                private fileService: FilesService) {}

    async createForContent(dto: CreateActDto, files: { staticFile?: Express.Multer.File[] }) {
        const staticFile = files?.staticFile?.[0];

        if (!staticFile) {
            throw new HttpException('staticFile is required', HttpStatus.BAD_REQUEST)
        }

        const savedFile: CreateDocumentResult = await this.fileService.createDocument(staticFile);

        const act = await this.actsRepository.create({
            name: savedFile.name,
            staticFile: savedFile.staticPath,
            size: savedFile.size,
            type: actTypes.CONTENT,
        })

        return act;
    }

    async createForOrder(dto: CreateActOrderDto, files: { staticFile?: Express.Multer.File[] }) {
        const staticFile = files?.staticFile?.[0];

        if (!staticFile) {
            throw new HttpException('staticFile is required', HttpStatus.BAD_REQUEST)
        }

        const savedFile: CreateDocumentResult = await this.fileService.createDocument(staticFile);

        const act = await this.actsRepository.create({
            name: savedFile.name,
            staticFile: savedFile.staticPath,
            size: savedFile.size,
            type: actTypes.ORDER,
        })

        return act;
    }

    async createForCompetition(dto: CreateActCompetitionDto, files: { staticFile?: Express.Multer.File[] }) {
        const staticFile = files?.staticFile?.[0];

        if (!staticFile) {
            throw new HttpException('staticFile is required', HttpStatus.BAD_REQUEST)
        }

        const savedFile: CreateDocumentResult = await this.fileService.createDocument(staticFile);

        const act = await this.actsRepository.create({
            name: savedFile.name,
            staticFile: savedFile.staticPath,
            size: savedFile.size,
            type: actTypes.COMPETITION,
        })

        return act;
    }

    async createForEducation(dto: CreateActEducationDto, files: { staticFile?: Express.Multer.File[] }) {
        const staticFile = files?.staticFile?.[0];

        if (!staticFile) {
            throw new HttpException('staticFile is required', HttpStatus.BAD_REQUEST)
        }

        const savedFile: CreateDocumentResult = await this.fileService.createDocument(staticFile);

        const act = await this.actsRepository.create({
            name: savedFile.name,
            staticFile: savedFile.staticPath,
            size: savedFile.size,
            type: actTypes.EDUCATION,
        })

        return act;
    }

    async createForLibrary(dto: CreateActLibraryDto, files: { staticFile?: Express.Multer.File[] }) {
        const staticFile = files?.staticFile?.[0];

        if (!staticFile) {
            throw new HttpException('staticFile is required', HttpStatus.BAD_REQUEST)
        }

        const savedFile: CreateDocumentResult = await this.fileService.createDocument(staticFile);

        const act = await this.actsRepository.create({
            name: savedFile.name,
            staticFile: savedFile.staticPath,
            size: savedFile.size,
            type: actTypes.LIBRARY,
        })

        return act;
    }

    async createForClinic(dto: CreateActClinicDto, files: { staticFile?: Express.Multer.File[] }) {
        const staticFile = files?.staticFile?.[0];

        if (!staticFile) {
            throw new HttpException('staticFile is required', HttpStatus.BAD_REQUEST)
        }

        const savedFile: CreateDocumentResult = await this.fileService.createDocument(staticFile);

        const act = await this.actsRepository.create({
            name: savedFile.name,
            staticFile: savedFile.staticPath,
            size: savedFile.size,
            type: actTypes.CLINIC,
        })

        return act;
    }

    async getAll() {
        return this.actsRepository.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: Sequelize.or(
                { type: null },
                { type: actTypes.CONTENT }
            )
        });
    }

    async getForLibrary() {
        return this.actsRepository.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: { type: actTypes.LIBRARY }
        });
    }

    async getForEducation() {
        return this.actsRepository.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: { type: actTypes.EDUCATION }
        });
    }

    async getForClinic() {
        return this.actsRepository.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: { type: actTypes.CLINIC }
        });
    }

    async delete(dto: DeleteActDto) {
        const act = await this.actsRepository.findOne({ where: { id: dto.actId }});

        if (!act) {
            throw new HttpException('the act not found', HttpStatus.BAD_REQUEST);
        }

        await this.fileService.deleteDocument(act.staticFile);
        await act.destroy();

        return act;
    }

    async deleteOrderAct(dto: DeleteActDto) {
        const act = await this.actsRepository.findOne({ where: { id: dto.actId }});

        if (!act) {
            throw new HttpException('the act not found', HttpStatus.BAD_REQUEST);
        }

        if (act.type !== actTypes.ORDER) {
            throw new HttpException('act must have type ORDER', HttpStatus.BAD_REQUEST);
        }

        await this.fileService.deleteDocument(act.staticFile);
        await act.destroy();

        return act;
    }
}
