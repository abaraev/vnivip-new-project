import {Body, Controller, Delete, Get, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {CompetitionsService} from "./competitions.service";
import {CreateCompetitionDto} from "./dto/create-competition.dto";
import {DeleteCompetitionDto} from "./dto/delete-competition.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CloseCompetitionDto} from "./dto/close-competition.dto";
import {OpenCompetitionDto} from "./dto/open-competition.dto";

@Controller('competitions')
export class CompetitionsController {
    constructor(private competitionsService: CompetitionsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateCompetitionDto) {
        return this.competitionsService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('close')
    close(@Body() dto: CloseCompetitionDto) {
        return this.competitionsService.close(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('open')
    open(@Body() dto: OpenCompetitionDto) {
        return this.competitionsService.open(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Query() dto: DeleteCompetitionDto) {
        return this.competitionsService.delete(dto);
    }

    @Get()
    getAll() {
        return this.competitionsService.getAll();
    }
}
