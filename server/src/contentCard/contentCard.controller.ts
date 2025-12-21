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
import {ContentCardService} from "./contentCard.service";
import {CreateContentCardDto} from "./dto/create-contentCard.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ImageValidationPipe} from "../pipes/image-validation.pipe";
import {VideoValidationPipe} from "../pipes/video-validation.pipe";
import {SetAlignTextContentCardDto} from "./dto/set-align-text-contentCard.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpPositionContentCardDto} from "./dto/up-position-contentCard.dto";
import {DownPositionContentCardDto} from "./dto/down-position-contentCard.dto";
import {SwapContentContentCardDto} from "./dto/swap-content-contentCard.dto";
import {UploadVideoContentCardDto} from "./dto/upload-video-contentCard.dto";
import {UploadImageContentCardDto} from "./dto/upload-image-contentCard.dto";
import {ChangeTextContentCardDto} from "./dto/change-text-contentCard.dto";
import {DeleteContentCardDto} from "./dto/delete-contentCard.dto";
import {MediaDeleteContentCardDto} from "./dto/media-delete-contentCard.dto";
import {AddContentCardDto} from "./dto/add-contentCard.dto";
import {GetContentCardByPageDto} from "./dto/get-contentCard-by-page.dto";

@Controller('content-cards')
export class ContentCardController {

    constructor(private contentCardsService: ContentCardService) {}

    @Get()
    getAll() {
        return this.contentCardsService.getAll();
    }

    @Get('page')
    getByPage(@Query() dto: GetContentCardByPageDto) {
        return this.contentCardsService.getByPage(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('set-align-text')
    setAlignText(@Body() dto: SetAlignTextContentCardDto) {
        return this.contentCardsService.setAlignText(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('swap-content')
    swapContent(@Body() dto: SwapContentContentCardDto) {
        return this.contentCardsService.swapContent(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('up-position')
    upPosition(@Body() dto: UpPositionContentCardDto) {
        return this.contentCardsService.upPosition(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('media-delete')
    mediaDelete(@Body() dto: MediaDeleteContentCardDto) {
        return this.contentCardsService.mediaDelete(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    delete(@Query() dto: DeleteContentCardDto) {
        return this.contentCardsService.delete(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('down-position')
    downPosition(@Body() dto: DownPositionContentCardDto) {
        return this.contentCardsService.downPosition(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    add(@Body() dto: AddContentCardDto) {
        return this.contentCardsService.add(dto);
    }


    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'img', maxCount: 1 },
        { name: 'video', maxCount: 1 },
    ]))
    create(@Body() dto: CreateContentCardDto,
           @UploadedFiles(
               new VideoValidationPipe({
                   maxSize: 100,
                   fieldName: 'video',
                   types: ['mp4'],
               }),
               new ImageValidationPipe({
                   maxSize: 20,
                   fieldName: 'img',
                   types: ['jpeg', 'png', 'jpg'],
               }),
           ) files: { img?: Express.Multer.File[], video?: Express.Multer.File[]}) {
        return this.contentCardsService.create(dto, files);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('upload-video')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'video', maxCount: 1 },
    ]))
    uploadVideo(@Body() dto: UploadVideoContentCardDto,
           @UploadedFiles(
               new VideoValidationPipe({
                   maxSize: 100,
                   fieldName: 'video',
                   types: ['mp4'],
               }),
           ) files: { video?: Express.Multer.File[]}) {
        return this.contentCardsService.uploadVideo(dto, files);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('upload-image')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ]))
    uploadImage(@Body() dto: UploadImageContentCardDto,
                @UploadedFiles(
                    new ImageValidationPipe({
                        maxSize: 20,
                        fieldName: 'image',
                        types: ['jpeg', 'png', 'jpg'],
                    }),
                ) files: { image?: Express.Multer.File[] }) {
        return this.contentCardsService.uploadImage(dto, files);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-text')
    changeText(@Body() dto: ChangeTextContentCardDto) {
        return this.contentCardsService.changeText(dto);
    }
}
