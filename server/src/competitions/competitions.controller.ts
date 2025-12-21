import {Body, Controller, Delete, Get, Post, Query, UseGuards} from '@nestjs/common';
import {CompetitionsService} from "./competitions.service";
import {CreateCompetitionDto} from "./dto/create-competition.dto";
import {DeleteCompetitionDto} from "./dto/delete-competition.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('competitions')
export class CompetitionsController {
    constructor(private competitionsService: CompetitionsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateCompetitionDto) {
        return this.competitionsService.create(dto);
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
