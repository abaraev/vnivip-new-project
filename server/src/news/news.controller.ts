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
import {NewsService} from "./news.service";
import {CreateNewsDto} from "./dto/create-news.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ImageValidationPipe} from "../pipes/image-validation.pipe";
import {PublishNewsDto} from "./dto/publish-news.dto";
import {DeleteNewsDto} from "./dto/delete-news.dto";
import {GetNewsPartDto} from "./dto/get-news-part.dto";
import {GetFullNewsDto} from "./dto/get-full-news.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ChangeDescriptionNewsDto} from "./dto/change-description-news.dto";
import {ChangeTitleNewsDto} from "./dto/change-title-news.dto";
import {HideNewsDto} from "./dto/hide-news.dto";
import {DeleteCoverDto} from "./dto/delete-cover.dto";
import {ChangeCoverDto} from "./dto/change-cover.dto";
import {GetNewsAdminPartDto} from "./dto/get-news-admin-part.dto";
import {ChangeDateNewsDto} from "./dto/change-date-news.dto";

@Controller('news')
export class NewsController {

    constructor(private newsService: NewsService) {}

    @Get()
    getAll() {
        return this.newsService.getAll();
    }

    @Get('/main')
    getMain() {
        return this.newsService.getMain();
    }

    @Get('/some')
    getSome() {
        return this.newsService.getSome();
    }

    @Get('/part')
    getPart(@Query() dto: GetNewsPartDto) {
        return this.newsService.getPart(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/admin-part')
    getAdminPart(@Query() dto: GetNewsAdminPartDto) {
        return this.newsService.getAdminPart(dto);
    }

    @Get('/full')
    getFullNews(@Query() dto: GetFullNewsDto) {
        return this.newsService.getFullNews(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/publish')
    publish(@Body() dto: PublishNewsDto) {
        return this.newsService.publish(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/change-date')
    changeDate(@Body() dto: ChangeDateNewsDto) {
        return this.newsService.changeDate(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/delete-cover')
    deleteCover(@Body() dto: DeleteCoverDto) {
        return this.newsService.deleteCover(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/hide')
    hide(@Body() dto: HideNewsDto) {
        return this.newsService.hide(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Query() dto: DeleteNewsDto) {
        return this.newsService.delete(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/change-description')
    changeDescription(@Body() dto: ChangeDescriptionNewsDto) {
        return this.newsService.changeDescription(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/change-title')
    changeTitle(@Body() dto: ChangeTitleNewsDto) {
        return this.newsService.changeTitle(dto);
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'coverImg', maxCount: 1 },
    ]))
    create(@Body() dto: CreateNewsDto,
           @UploadedFiles(
               new ImageValidationPipe({
                   maxSize: 50,
                   fieldName: 'coverImg',
                   types: ['jpeg', 'png', 'jpg'],
               }),
           ) files: { coverImg: Express.Multer.File[] }) {
        return this.newsService.create(dto, files);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-cover')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'coverImg', maxCount: 1 },
    ]))
    changeCover(@Body() dto: ChangeCoverDto,
           @UploadedFiles(
               new ImageValidationPipe({
                   maxSize: 50,
                   fieldName: 'coverImg',
                   types: ['jpeg', 'png', 'jpg'],
               }),
           ) files: { coverImg: Express.Multer.File[] }) {
        return this.newsService.changeCover(dto, files);
    }
}
