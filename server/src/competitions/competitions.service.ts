import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateCompetitionDto} from "./dto/create-competition.dto";
import {Competition} from "./competitions.model";
import {DeleteServiceDto} from "../services/dto/delete-service.dto";
import {DeleteCompetitionDto} from "./dto/delete-competition.dto";

@Injectable()
export class CompetitionsService {
    constructor(@InjectModel(Competition) private competitionRepository: typeof Competition) {}

    async create(dto: CreateCompetitionDto) {
        return await this.competitionRepository.create({ name: dto.name, description: dto.description });
    }

    async getAll() {
        return await this.competitionRepository.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    async delete(dto: DeleteCompetitionDto) {
        const competition = await this.competitionRepository.findOne({ where: { id: dto.competitionId }});

        if (!competition) {
            throw new HttpException('competition not found', HttpStatus.BAD_REQUEST);
        }

        await competition.destroy();

        return competition;
    }
}
