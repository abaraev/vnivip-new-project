import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateCompetitionDto} from "./dto/create-competition.dto";
import {Competition} from "./competitions.model";
import {DeleteCompetitionDto} from "./dto/delete-competition.dto";
import {CloseCompetitionDto} from "./dto/close-competition.dto";
import {OpenCompetitionDto} from "./dto/open-competition.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class CompetitionsService {
    constructor(@InjectModel(Competition) private competitionRepository: typeof Competition,
                private fileService: FilesService) {}

    async create(dto: CreateCompetitionDto) {
        if (dto.documents) {
            try {
                JSON.parse(dto.documents);
            } catch (e) {
                throw new HttpException('required documents in JSON format', HttpStatus.BAD_REQUEST);
            }
        }

        return await this.competitionRepository.create({
            name: dto.name,
            description: dto.description,
            documents: dto.documents,
        });
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

        try {
            if (competition.documents) {
                const documents = JSON.parse(competition.documents);
                if (documents.length) {
                    documents.forEach(async (item) => {
                        await this.fileService.deleteDocument(item.staticFile)
                    })
                }
            }
        } catch (e) {
            console.log(e);
        }

        await competition.destroy();

        return competition;
    }

    async close(dto: CloseCompetitionDto) {
        const competition = await this.competitionRepository.findOne({ where: { id: dto.competitionId } });

        if(!competition) {
            throw new HttpException('the competition with this competitionId not found', HttpStatus.BAD_REQUEST)
        }

        await competition.update({ closed: true });
        competition.closed = true;

        return competition;
    }

    async open(dto: OpenCompetitionDto) {
        const competition = await this.competitionRepository.findOne({ where: { id: dto.competitionId } });

        if(!competition) {
            throw new HttpException('the competition with this competitionId not found', HttpStatus.BAD_REQUEST)
        }

        await competition.update({ closed: false });
        competition.closed = false;

        return competition;
    }
}
