import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateParagraphDto} from "./dto/create-paragraph.dto";
import {FilesService} from "../files/files.service";
import {NewsService} from "../news/news.service";
import {InjectModel} from "@nestjs/sequelize";
import {Paragraph} from "./paragraphs.model";
import {SetAlignTextParagraphDto} from "./dto/set-align-text-paragraph.dto";
import {UpPositionParagraphDto} from "./dto/up-position-paragraph.dto";
import {DownPositionParagraphDto} from "./dto/down-position-paragraph.dto";
import {SwapContentParagraphDto} from "./dto/swap-content-paragraph.dto";
import {UploadVideoParagraphDto} from "./dto/upload-video-paragraph.dto";
import {UploadImageParagraphDto} from "./dto/upload-image-paragraph.dto";
import {ChangeTextParagraphDto} from "./dto/change-text-paragraph.dto";
import {DeleteParagraphDto} from "./dto/delete-paragraph.dto";
import {MediaDeleteParagraphDto} from "./dto/media-delete-paragraph.dto";
import {AddParagraphDto} from "./dto/add-paragraph.dto";

@Injectable()
export class ParagraphsService {
    constructor(@InjectModel(Paragraph) private paragraphsRepository: typeof Paragraph,
                private fileService: FilesService,
                private newsService: NewsService) {}

    async create(dto: CreateParagraphDto, files: { img?: Express.Multer.File[], video?: Express.Multer.File[]}) {
        const img = files?.img?.[0];
        const video = files?.video?.[0];

        // Проверки
        if (dto.text || img || video) {
            const data: CreateParagraphDto = {
                newsId: dto.newsId,
                text: dto.text,
                firstElement: 'text',
            }


            if(img && video) {
                throw new HttpException('only one video or image required', HttpStatus.BAD_REQUEST)
            }

            const news = await this.newsService.findOne(data.newsId);
            if (!news) {
                throw new HttpException('the news with this newsId not found', HttpStatus.BAD_REQUEST)
            }



            // Обработка
            if (img) {
                data.img = await this.fileService.createImage(img);
            }
            if (video) {
                const files = await this.fileService.createVideo(video)
                data.video = files.videoFileName;
                data.videoPoster = files.posterFileName;
            }

            if (!data.text) {
                data.firstElement = 'media';
            }

            const paragraphPosition = news.paragraphs.length;
            data.position = paragraphPosition;

            const paragraph = await this.paragraphsRepository.create(data);
            await news.$add('paragraphs', [paragraph.id])
            return paragraph;
        }

        throw new HttpException('text or image or video required', HttpStatus.BAD_REQUEST)
    }

    async add(dto: AddParagraphDto) {
        // Проверки
        if (dto.text || dto.video || dto.img) {

            const news = await this.newsService.findOne(Number(dto.newsId));

            const paragraphPosition = news.paragraphs.length;

            const paragraph = await this.paragraphsRepository.create({
                text: dto.text,
                img: dto.img,
                videoPoster: dto.videoPoster,
                video: dto.video,
                alignText: dto.alignText,
                firstElement: dto.firstElement,
                position: paragraphPosition,
                newsId: Number(dto.newsId),
            });

            await news.$add('paragraphs', [paragraph.id])
            return paragraph;
        }

        throw new HttpException('text or image or video required', HttpStatus.BAD_REQUEST)
    }

    async uploadVideo(dto: UploadVideoParagraphDto, files: { video?: Express.Multer.File[]}) {
        const video = files?.video?.[0];

        if (!video) {
            throw new HttpException('video required', HttpStatus.BAD_REQUEST)
        }

        const paragraph = await this.paragraphsRepository.findOne({ where: { newsId: dto.newsId, position: dto.paragraphPosition }});

        if (!paragraph) {
            throw new HttpException('the paragraph not found', HttpStatus.BAD_REQUEST)
        }

        const filesVideo = await this.fileService.createVideo(video);
        await paragraph.update({ video: filesVideo.videoFileName, videoPoster: filesVideo.posterFileName });

        return {
            videoFileName: filesVideo.videoFileName,
            posterFileName: filesVideo.posterFileName,
        };
    }

    async uploadImage(dto: UploadImageParagraphDto, files: { image?: Express.Multer.File[] }) {
        const image = files?.image?.[0];

        if (!image) {
            throw new HttpException('image required', HttpStatus.BAD_REQUEST)
        }

        const paragraph = await this.paragraphsRepository.findOne({ where: { newsId: dto.newsId, position: dto.paragraphPosition }});

        if (!paragraph) {
            throw new HttpException('the paragraph not found', HttpStatus.BAD_REQUEST)
        }

        const imageFileName = await this.fileService.createImage(image);
        await paragraph.update({ img: imageFileName });

        return {
            fileName: imageFileName,
        }
    }

    async changeText(dto: ChangeTextParagraphDto) {
        const paragraph = await this.paragraphsRepository.findOne({ where: { newsId: dto.newsId, position: dto.paragraphPosition }});

        if (!paragraph) {
            throw new HttpException('the paragraph not found', HttpStatus.BAD_REQUEST)
        }

        await paragraph.update({ text: dto.text });

        return paragraph;
    }

    async getAll() {
        return await this.paragraphsRepository.findAll();
    }

    async setAlignText(dto: SetAlignTextParagraphDto) {
        const paragraph = await this.paragraphsRepository.findOne({ where: { position: dto.paragraphPosition, newsId: dto.newsId }})

        if (!paragraph) {
            throw new HttpException('paragraph with the id not found', HttpStatus.BAD_REQUEST)
        }

        if (paragraph.alignText === dto.alignText) {
            throw new HttpException('paragraph already have the alignText', HttpStatus.BAD_REQUEST)
        }

        await paragraph.update({ alignText: dto.alignText })
        paragraph.alignText = dto.alignText;

        return paragraph;
    }

    async mediaDelete(dto: MediaDeleteParagraphDto) {
        const paragraph = await this.paragraphsRepository.findOne({ where: { position: dto.paragraphPosition, newsId: dto.newsId }})

        if (!paragraph) {
            throw new HttpException('paragraph with the id not found', HttpStatus.BAD_REQUEST)
        }

        if (paragraph.video) {
            await this.fileService.deleteVideo(paragraph.video, paragraph.videoPoster);
            await paragraph.update({
                video: null,
                videoPoster: null,
            })
        }

        if (paragraph.img) {
            await this.fileService.deleteImage(paragraph.img);
            await paragraph.update({
                img: null,
            })
        }

        return paragraph;
    }

    async swapContent(dto: SwapContentParagraphDto) {
        const paragraph = await this.paragraphsRepository.findOne({ where: { position: dto.paragraphPosition, newsId: dto.newsId }})

        if (!paragraph) {
            throw new HttpException('paragraph with the id not found', HttpStatus.BAD_REQUEST)
        }

        if (paragraph.firstElement === 'media') {
            await paragraph.update({ firstElement: 'text' })
            paragraph.firstElement = 'text';

            return paragraph;
        }

        await paragraph.update({ firstElement: 'media' })
        paragraph.firstElement = 'media';

        return paragraph;
    }

    async upPosition(dto: UpPositionParagraphDto) {
        if (Number(dto.paragraphPosition) === 0) {
            throw new HttpException('The paragraph is already at the very top', HttpStatus.BAD_REQUEST);
        }

        const currentPosition = Number(dto.paragraphPosition);
        const replaceablePosition = Number(dto.paragraphPosition) - 1;

        const replaceableParagraph = await this.paragraphsRepository.findOne({ where: { newsId: dto.newsId, position: replaceablePosition }});
        const paragraph = await this.paragraphsRepository.findOne({ where: { newsId: dto.newsId, position: currentPosition }});

        if (!paragraph) {
            throw new HttpException('paragraph with the id not found', HttpStatus.BAD_REQUEST)
        }

        await paragraph.update({ position: replaceablePosition })
        await replaceableParagraph.update({ position: currentPosition })


        return paragraph;
    }

    async delete(dto: DeleteParagraphDto) {
        const paragraph = await this.paragraphsRepository.findOne({ where: { newsId: dto.newsId, position: dto.paragraphPosition }});

        if (!paragraph) {
            throw new HttpException('paragraph with the id not found', HttpStatus.BAD_REQUEST)
        }

        const news = await this.newsService.findOne(Number(dto.newsId));

        if (news.paragraphs.length === 1) {
            await news.update({ published: false })
        }

        if (paragraph.video) {
            await this.fileService.deleteVideo(paragraph.video, paragraph.videoPoster);
        }

        if (paragraph.img) {
            await this.fileService.deleteImage(paragraph.img);
        }

        await paragraph.destroy();

        let haveUpParagraphs = true;
        let nextPosParagraph = paragraph.position + 1;
        while (haveUpParagraphs) {
            const currentParagraph = await this.paragraphsRepository.findOne({ where: { newsId: dto.newsId, position: nextPosParagraph }})

            if (!currentParagraph) {
                haveUpParagraphs = false;
            } else {
                await currentParagraph.update({ position: nextPosParagraph - 1 })
                nextPosParagraph += 1;
            }
        }

        const newsAfter = await this.newsService.findOne(Number(dto.newsId));
        const sortedParagraphs = newsAfter.paragraphs.sort((a, b) => a.position - b.position);


        return sortedParagraphs;
    }

    async downPosition(dto: DownPositionParagraphDto) {
        const news = await this.newsService.findOne(Number(dto.newsId));

        if (Number(dto.paragraphPosition) === news.paragraphs.length - 1) {
            throw new HttpException('The paragraph is already at the very down', HttpStatus.BAD_REQUEST);
        }

        const currentPosition = Number(dto.paragraphPosition);
        const replaceablePosition = Number(dto.paragraphPosition) + 1;

        const replaceableParagraph = await this.paragraphsRepository.findOne({ where: { newsId: dto.newsId, position: replaceablePosition }});
        const paragraph = await this.paragraphsRepository.findOne({ where: { newsId: dto.newsId, position: currentPosition }});

        if (!paragraph) {
            throw new HttpException('paragraph with the id not found', HttpStatus.BAD_REQUEST)
        }

        await paragraph.update({ position: replaceablePosition })
        await replaceableParagraph.update({ position: currentPosition })


        return paragraph;
    }
}
