import {Body, Controller, Delete, Get, Post, Query, UseGuards} from '@nestjs/common';
import {VacanciesService} from "./vacancies.service";
import {CreateVacancyDto} from "./dto/create-vacancy.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {DeleteVacancyDto} from "./dto/delete-vacancy.dto";

@Controller('vacancies')
export class VacanciesController {
    constructor(private vacanciesService: VacanciesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateVacancyDto) {
        return this.vacanciesService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Query() dto: DeleteVacancyDto) {
        return this.vacanciesService.delete(dto);
    }

    @Get()
    getAll() {
        return this.vacanciesService.getAll();
    }
}
