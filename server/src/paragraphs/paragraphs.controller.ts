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
import {ParagraphsService} from "./paragraphs.service";
import {CreateParagraphDto} from "./dto/create-paragraph.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ImageValidationPipe} from "../pipes/image-validation.pipe";
import {VideoValidationPipe} from "../pipes/video-validation.pipe";
import {SetAlignTextParagraphDto} from "./dto/set-align-text-paragraph.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpPositionParagraphDto} from "./dto/up-position-paragraph.dto";
import {DownPositionParagraphDto} from "./dto/down-position-paragraph.dto";
import {SwapContentParagraphDto} from "./dto/swap-content-paragraph.dto";
import {UploadVideoParagraphDto} from "./dto/upload-video-paragraph.dto";
import {UploadImageParagraphDto} from "./dto/upload-image-paragraph.dto";
import {ChangeTextParagraphDto} from "./dto/change-text-paragraph.dto";
import {DeleteParagraphDto} from "./dto/delete-paragraph.dto";
import {MediaDeleteParagraphDto} from "./dto/media-delete-paragraph.dto";
import {AddParagraphDto} from "./dto/add-paragraph.dto";

@Controller('paragraphs')
export class ParagraphsController {

    constructor(private paragraphsService: ParagraphsService) {}

    @Get()
    getAll() {
        return this.paragraphsService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Patch('set-align-text')
    setAlignText(@Body() dto: SetAlignTextParagraphDto) {
        return this.paragraphsService.setAlignText(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('swap-content')
    swapContent(@Body() dto: SwapContentParagraphDto) {
        return this.paragraphsService.swapContent(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('up-position')
    upPosition(@Body() dto: UpPositionParagraphDto) {
        return this.paragraphsService.upPosition(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('media-delete')
    mediaDelete(@Body() dto: MediaDeleteParagraphDto) {
        return this.paragraphsService.mediaDelete(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    delete(@Query() dto: DeleteParagraphDto) {
        return this.paragraphsService.delete(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('down-position')
    downPosition(@Body() dto: DownPositionParagraphDto) {
        return this.paragraphsService.downPosition(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    add(@Body() dto: AddParagraphDto) {
        return this.paragraphsService.add(dto);
    }


    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'img', maxCount: 1 },
        { name: 'video', maxCount: 1 },
    ]))
    create(@Body() dto: CreateParagraphDto,
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
        return this.paragraphsService.create(dto, files);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('upload-video')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'video', maxCount: 1 },
    ]))
    uploadVideo(@Body() dto: UploadVideoParagraphDto,
           @UploadedFiles(
               new VideoValidationPipe({
                   maxSize: 100,
                   fieldName: 'video',
                   types: ['mp4'],
               }),
           ) files: { video?: Express.Multer.File[]}) {
        return this.paragraphsService.uploadVideo(dto, files);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('upload-image')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ]))
    uploadImage(@Body() dto: UploadImageParagraphDto,
                @UploadedFiles(
                    new ImageValidationPipe({
                        maxSize: 20,
                        fieldName: 'image',
                        types: ['jpeg', 'png', 'jpg'],
                    }),
                ) files: { image?: Express.Multer.File[] }) {
        return this.paragraphsService.uploadImage(dto, files);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-text')
    changeText(@Body() dto: ChangeTextParagraphDto) {
        return this.paragraphsService.changeText(dto);
    }
}
