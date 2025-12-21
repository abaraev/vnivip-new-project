import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Vacancy} from "./vacancies.model";
import {CreateVacancyDto} from "./dto/create-vacancy.dto";
import {DeleteCompetitionDto} from "../competitions/dto/delete-competition.dto";
import {DeleteVacancyDto} from "./dto/delete-vacancy.dto";

@Injectable()
export class VacanciesService {
    constructor(@InjectModel(Vacancy) private vacancyRepository: typeof Vacancy) {}

    async create(dto: CreateVacancyDto) {
        return await this.vacancyRepository.create(dto);
    }

    async getAll() {
        return await this.vacancyRepository.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    async delete(dto: DeleteVacancyDto) {
        const vacancy = await this.vacancyRepository.findOne({ where: { id: dto.vacancyId }});

        if (!vacancy) {
            throw new HttpException('vacancy not found', HttpStatus.BAD_REQUEST);
        }

        await vacancy.destroy();

        return vacancy;
    }
}
