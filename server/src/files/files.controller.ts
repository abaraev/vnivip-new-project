import {
    Controller, Delete,
    HttpException,
    HttpStatus,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {FilesService} from "./files.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ImageValidationPipe} from "../pipes/image-validation.pipe";
import {VideoValidationPipe} from "../pipes/video-validation.pipe";
import {DeleteVideoDto} from "./dto/delete-video.dto";
import {DeleteImageDto} from "./dto/delete-image.dto";

@Controller('files')
export class FilesController {

    constructor(private filesService: FilesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('upload-image')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ]))
    async uploadImage(@UploadedFiles(
        new ImageValidationPipe({
            maxSize: 20,
            fieldName: 'image',
            types: ['jpeg', 'png', 'jpg'],
        }),
    ) files: { image?: Express.Multer.File[] }) {
        const image = files?.image?.[0];

        if (!image) {
            throw new HttpException('required image in form-data', HttpStatus.BAD_REQUEST);
        }

        const fileName = await this.filesService.createImage(image);
        return {
            fileName: fileName,
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload-video')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'video', maxCount: 1 },
    ]))
    async uploadVideo(@UploadedFiles(
        new VideoValidationPipe({
            maxSize: 100,
            fieldName: 'video',
            types: ['mp4'],
        }),
    ) files: { video?: Express.Multer.File[] }) {
        const video = files?.video?.[0];

        if (!video) {
            throw new HttpException('required video in form-data', HttpStatus.BAD_REQUEST);
        }

        return await this.filesService.createVideo(video);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-video')
    async deleteVideo(@Query() dto: DeleteVideoDto) {
        await this.filesService.deleteVideo(dto.videoFileName, dto.posterFileName);

        return {
            videoFileName: dto.videoFileName,
            posterFileName: dto.posterFileName,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-image')
    async deleteImage(@Query() dto: DeleteImageDto) {
        await this.filesService.deleteImage(dto.fileName);

        return {
            fileName: dto.fileName,
        };
    }
}
