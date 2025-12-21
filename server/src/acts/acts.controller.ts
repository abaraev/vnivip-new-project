import {Body, Controller, Delete, Get, Post, Query, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {ActsService} from "./acts.service";
import {CreateActDto} from "./dto/create-act.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {DocumentValidationPipe} from "../pipes/document-validation.pipe";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {DeleteActDto} from "./dto/delete-act.dto";
import {CreateActOrderDto} from "./dto/create-act-order.dto";

@Controller('acts')
export class ActsController {
    constructor(private actsService: ActsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('content')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'staticFile', maxCount: 1 },
    ]))
    createForContent(@Body() dto: CreateActDto,
           @UploadedFiles(
               new DocumentValidationPipe({
                   maxSize: 50,
                   fieldName: 'staticFile',
               }),
           ) files: { staticFile?: Express.Multer.File[] }) {
        return this.actsService.createForContent(dto, files);
    }

    @Post('order')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'staticFile', maxCount: 1 },
    ]))
    createForOrder(@Body() dto: CreateActOrderDto,
           @UploadedFiles(
               new DocumentValidationPipe({
                   maxSize: 50,
                   fieldName: 'staticFile',
               }),
           ) files: { staticFile?: Express.Multer.File[] }) {
        return this.actsService.createForOrder(dto, files);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Query() dto: DeleteActDto) {
        return this.actsService.delete(dto);
    }

    @Delete('order')
    deleteOrderAct(@Query() dto: DeleteActDto) {
        return this.actsService.deleteOrderAct(dto);
    }

    @Get()
    getAll() {
        return this.actsService.getAll();
    }
}
