import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ServicesService} from "./services.service";
import {CreateServiceDto} from "./dto/create-service.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ImageValidationPipe} from "../pipes/image-validation.pipe";
import {GetServicesPartDto} from "./dto/get-services-part.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GetServiceOneDto} from "./dto/get-service-one.dto";
import {ChangeNameServiceDto} from "./dto/change-name-service.dto";
import {ChangePriceServiceDto} from "./dto/change-price-service.dto";
import {DeleteCoverServiceDto} from "./dto/delete-cover-service.dto";
import {ChangeCoverServiceDto} from "./dto/change-cover-service.dto";
import {DeleteServiceDto} from "./dto/delete-service.dto";

@Controller('services')
export class ServicesController {
    constructor(private servicesService: ServicesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'coverImg', maxCount: 1 },
    ]))
    create(@Body() dto: CreateServiceDto,
           @UploadedFiles(
               new ImageValidationPipe({
                   maxSize: 50,
                   fieldName: 'coverImg',
                   types: ['jpeg', 'png', 'jpg'],
               }),
           ) files: { coverImg?: Express.Multer.File[] }) {
        return this.servicesService.create(dto, files);
    }

    @Get()
    getAll() {
        return this.servicesService.getAll();
    }

    @Get('part')
    getPart(@Query() dto: GetServicesPartDto) {
        return this.servicesService.getPart(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Query() dto: DeleteServiceDto) {
        return this.servicesService.delete(dto);
    }

    @Get('one')
    getOne(@Query() dto: GetServiceOneDto) {
        return this.servicesService.getOne(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-name')
    changeName(@Body() dto: ChangeNameServiceDto) {
        return this.servicesService.changeName(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-price')
    changePrice(@Body() dto: ChangePriceServiceDto) {
        return this.servicesService.changePrice(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('delete-cover')
    deleteCover(@Body() dto: DeleteCoverServiceDto) {
        return this.servicesService.deleteCover(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-cover')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'coverImg', maxCount: 1 },
    ]))
    changeCover(@Body() dto: ChangeCoverServiceDto,
           @UploadedFiles(
               new ImageValidationPipe({
                   maxSize: 50,
                   fieldName: 'coverImg',
                   types: ['jpeg', 'png', 'jpg'],
               }),
           ) files: { coverImg?: Express.Multer.File[] }) {
        return this.servicesService.changeCover(dto, files);
    }
}
