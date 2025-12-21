import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateContentCardDto} from "./dto/create-contentCard.dto";
import {FilesService} from "../files/files.service";
import {InjectModel} from "@nestjs/sequelize";
import {ContentCard} from "./contentCard.model";
import {SetAlignTextContentCardDto} from "./dto/set-align-text-contentCard.dto";
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

@Injectable()
export class ContentCardService {
    constructor(@InjectModel(ContentCard) private contentCardsRepository: typeof ContentCard,
                private fileService: FilesService) {}

    async create(dto: CreateContentCardDto, files: { img?: Express.Multer.File[], video?: Express.Multer.File[]}) {
        const img = files?.img?.[0];
        const video = files?.video?.[0];

        // Проверки
        if (dto.text || img || video) {
            const data: CreateContentCardDto = {
                page: dto.page,
                text: dto.text,
                firstElement: 'text',
            }


            if(img && video) {
                throw new HttpException('only one video or image required', HttpStatus.BAD_REQUEST)
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

            const pageContentCards = await this.contentCardsRepository.findAll({ where: { page: dto.page }})

            const contentCardPosition = pageContentCards.length;
            data.position = contentCardPosition;

            const contentCard = await this.contentCardsRepository.create(data);

            return contentCard;
        }

        throw new HttpException('text or image or video required', HttpStatus.BAD_REQUEST)
    }

    async add(dto: AddContentCardDto) {
        // Проверки
        if (dto.text || dto.video || dto.img) {

            const pageContentCards = await this.contentCardsRepository.findAll({ where: { page: dto.page }})

            const contentCardPosition = pageContentCards.length;

            const contentCard = await this.contentCardsRepository.create({
                text: dto.text,
                img: dto.img,
                videoPoster: dto.videoPoster,
                video: dto.video,
                alignText: dto.alignText,
                firstElement: dto.firstElement,
                position: contentCardPosition,
                page: dto.page,
            });

            return contentCard;
        }

        throw new HttpException('text or image or video required', HttpStatus.BAD_REQUEST)
    }

    async uploadVideo(dto: UploadVideoContentCardDto, files: { video?: Express.Multer.File[]}) {
        const video = files?.video?.[0];

        if (!video) {
            throw new HttpException('video required', HttpStatus.BAD_REQUEST)
        }

        const contentCard = await this.contentCardsRepository.findOne({ where: { page: dto.page, position: dto.contentCardPosition }});

        if (!contentCard) {
            throw new HttpException('the contentCard not found', HttpStatus.BAD_REQUEST)
        }

        const filesVideo = await this.fileService.createVideo(video);
        await contentCard.update({ video: filesVideo.videoFileName, videoPoster: filesVideo.posterFileName });

        return {
            videoFileName: filesVideo.videoFileName,
            posterFileName: filesVideo.posterFileName,
        };
    }

    async uploadImage(dto: UploadImageContentCardDto, files: { image?: Express.Multer.File[] }) {
        const image = files?.image?.[0];

        if (!image) {
            throw new HttpException('image required', HttpStatus.BAD_REQUEST)
        }

        const contentCard = await this.contentCardsRepository.findOne({ where: { page: dto.page, position: dto.contentCardPosition }});

        if (!contentCard) {
            throw new HttpException('the contentCard not found', HttpStatus.BAD_REQUEST)
        }

        const imageFileName = await this.fileService.createImage(image);
        await contentCard.update({ img: imageFileName });

        return {
            fileName: imageFileName,
        }
    }

    async changeText(dto: ChangeTextContentCardDto) {
        const contentCard = await this.contentCardsRepository.findOne({ where: { page: dto.page, position: dto.contentCardPosition }});

        if (!contentCard) {
            throw new HttpException('the contentCard not found', HttpStatus.BAD_REQUEST)
        }

        await contentCard.update({ text: dto.text });

        return contentCard;
    }

    async getAll() {
        return await this.contentCardsRepository.findAll();
    }

    async setAlignText(dto: SetAlignTextContentCardDto) {
        const contentCard = await this.contentCardsRepository.findOne({ where: { position: dto.contentCardPosition, page: dto.page }})

        if (!contentCard) {
            throw new HttpException('contentCard with the id not found', HttpStatus.BAD_REQUEST)
        }

        if (contentCard.alignText === dto.alignText) {
            throw new HttpException('contentCard already have the alignText', HttpStatus.BAD_REQUEST)
        }

        await contentCard.update({ alignText: dto.alignText })
        contentCard.alignText = dto.alignText;

        return contentCard;
    }

    async mediaDelete(dto: MediaDeleteContentCardDto) {
        const contentCard = await this.contentCardsRepository.findOne({ where: { position: dto.contentCardPosition, page: dto.page }})

        if (!contentCard) {
            throw new HttpException('contentCard with the id not found', HttpStatus.BAD_REQUEST)
        }

        if (contentCard.video) {
            await this.fileService.deleteVideo(contentCard.video, contentCard.videoPoster);
            await contentCard.update({
                video: null,
                videoPoster: null,
            })
        }

        if (contentCard.img) {
            await this.fileService.deleteImage(contentCard.img);
            await contentCard.update({
                img: null,
            })
        }

        return contentCard;
    }

    async swapContent(dto: SwapContentContentCardDto) {
        const contentCard = await this.contentCardsRepository.findOne({ where: { position: dto.contentCardPosition, page: dto.page }})

        if (!contentCard) {
            throw new HttpException('contentCard with the id not found', HttpStatus.BAD_REQUEST)
        }

        if (contentCard.firstElement === 'media') {
            await contentCard.update({ firstElement: 'text' })
            contentCard.firstElement = 'text';

            return contentCard;
        }

        await contentCard.update({ firstElement: 'media' })
        contentCard.firstElement = 'media';

        return contentCard;
    }

    async upPosition(dto: UpPositionContentCardDto) {
        if (Number(dto.contentCardPosition) === 0) {
            throw new HttpException('The contentCard is already at the very top', HttpStatus.BAD_REQUEST);
        }

        const currentPosition = Number(dto.contentCardPosition);
        const replaceablePosition = Number(dto.contentCardPosition) - 1;

        const replaceableContentCard = await this.contentCardsRepository.findOne({ where: { page: dto.page, position: replaceablePosition }});
        const contentCard = await this.contentCardsRepository.findOne({ where: { page: dto.page, position: currentPosition }});

        if (!contentCard) {
            throw new HttpException('contentCard with the id not found', HttpStatus.BAD_REQUEST)
        }

        await contentCard.update({ position: replaceablePosition })
        await replaceableContentCard.update({ position: currentPosition })


        return contentCard;
    }

    async delete(dto: DeleteContentCardDto) {
        const contentCard = await this.contentCardsRepository.findOne({ where: { page: dto.page, position: dto.contentCardPosition }});

        if (!contentCard) {
            throw new HttpException('contentCard with the id not found', HttpStatus.BAD_REQUEST)
        }

        if (contentCard.video) {
            await this.fileService.deleteVideo(contentCard.video, contentCard.videoPoster);
        }

        if (contentCard.img) {
            await this.fileService.deleteImage(contentCard.img);
        }

        await contentCard.destroy();

        let haveUpContentCards = true;
        let nextPosContentCard = contentCard.position + 1;
        while (haveUpContentCards) {
            const currentParagraph = await this.contentCardsRepository.findOne({ where: { page: dto.page, position: nextPosContentCard }})

            if (!currentParagraph) {
                haveUpContentCards = false;
            } else {
                await currentParagraph.update({ position: nextPosContentCard - 1 })
                nextPosContentCard += 1;
            }
        }

        const pageContentCards = await this.contentCardsRepository.findAll({ where: { page: dto.page }})
        const sortedContentCards = pageContentCards.sort((a, b) => a.position - b.position);


        return sortedContentCards;
    }

    async downPosition(dto: DownPositionContentCardDto) {
        const pageContentCards = await this.contentCardsRepository.findAll({ where: { page: dto.page }})

        if (Number(dto.contentCardPosition) === pageContentCards.length - 1) {
            throw new HttpException('The contentCard is already at the very down', HttpStatus.BAD_REQUEST);
        }

        const currentPosition = Number(dto.contentCardPosition);
        const replaceablePosition = Number(dto.contentCardPosition) + 1;

        const replaceableParagraph = await this.contentCardsRepository.findOne({ where: { page: dto.page, position: replaceablePosition }});
        const contentCard = await this.contentCardsRepository.findOne({ where: { page: dto.page, position: currentPosition }});

        if (!contentCard) {
            throw new HttpException('contentCard with the id not found', HttpStatus.BAD_REQUEST)
        }

        await contentCard.update({ position: replaceablePosition })
        await replaceableParagraph.update({ position: currentPosition })


        return contentCard;
    }

    async getByPage(dto: GetContentCardByPageDto) {
        return await this.contentCardsRepository.findAll({ where: { page: dto.page }, order: [['position', 'ASC']] })
    }
}
