import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateNewsDto} from "./dto/create-news.dto";
import {FilesService} from "../files/files.service";
import {InjectModel} from "@nestjs/sequelize";
import {News} from "./news.model";
import {PublishNewsDto} from "./dto/publish-news.dto";
import {DeleteNewsDto} from "./dto/delete-news.dto";
import {GetNewsPartDto} from "./dto/get-news-part.dto";
import {Op} from "sequelize";
import {GetFullNewsDto} from "./dto/get-full-news.dto";
import {ChangeDescriptionNewsDto} from "./dto/change-description-news.dto";
import {ChangeTitleNewsDto} from "./dto/change-title-news.dto";
import {HideNewsDto} from "./dto/hide-news.dto";
import {DeleteCoverDto} from "./dto/delete-cover.dto";
import {ChangeCoverDto} from "./dto/change-cover.dto";
import {GetNewsAdminPartDto} from "./dto/get-news-admin-part.dto";
import {ChangeDateNewsDto} from "./dto/change-date-news.dto";

@Injectable()
export class NewsService {

    constructor(@InjectModel(News) private newsRepository: typeof News,
                private fileService: FilesService) {}

    async create(dto: CreateNewsDto, files: { coverImg: Express.Multer.File[] }) {
        const coverImg = files?.coverImg?.[0];
        const data: CreateNewsDto = {
            title: dto.title,
            description: dto.description,
            timestamp: new Date().getTime(),
        }
        if (coverImg) {
            data.coverImg = await this.fileService.createImage(coverImg);
        }
        const news = await this.newsRepository.create(data);
        return news;
    }

    async delete(dto: DeleteNewsDto) {
        const news = await this.newsRepository.findOne({ where: { id: dto.newsId } });

        if(!news) {
            throw new HttpException('the news with this newsId not found', HttpStatus.BAD_REQUEST)
        }

        if (news.coverImg) {
            await this.fileService.deleteImage(news.coverImg);
        }

        await news.destroy();

        return news;
    }

    async changeDescription(dto: ChangeDescriptionNewsDto) {
        const news = await this.newsRepository.findOne({ where: { id: dto.newsId } });

        if(!news) {
            throw new HttpException('the news with this newsId not found', HttpStatus.BAD_REQUEST)
        }

        await news.update({ description: dto.description });
        news.description = dto.description;

        return news;
    }

    async changeTitle(dto: ChangeTitleNewsDto) {
        const news = await this.newsRepository.findOne({ where: { id: dto.newsId } });

        if(!news) {
            throw new HttpException('the news with this newsId not found', HttpStatus.BAD_REQUEST)
        }

        await news.update({ title: dto.title });
        news.title = dto.title;

        return news;
    }

    async publish(dto: PublishNewsDto) {
        const news = await this.newsRepository.findOne({ where: { id: dto.newsId }, include: {all: true}});

        if(!news) {
            throw new HttpException('the news with this newsId not found', HttpStatus.BAD_REQUEST)
        }

        if(news.published) {
            throw new HttpException('the news has already been published', HttpStatus.BAD_REQUEST)
        }

        if(!news.paragraphs.length) {
            throw new HttpException('the news have not content', HttpStatus.BAD_REQUEST)
        }

        await news.update({ published: true });
        news.published = true;

        return news;
    }

    async changeDate(dto: ChangeDateNewsDto) {
        const news = await this.newsRepository.findOne({ where: { id: dto.newsId } });

        if(!news) {
            throw new HttpException('the news with this newsId not found', HttpStatus.BAD_REQUEST)
        }

        console.log(dto);

        await news.update({ timestamp: dto.timestamp });

        return news;
    }

    async deleteCover(dto: DeleteCoverDto) {
        const news = await this.newsRepository.findOne({ where: { id: dto.newsId }});

        if(!news) {
            throw new HttpException('the news with this newsId not found', HttpStatus.BAD_REQUEST);
        }

        await this.fileService.deleteImage(news.coverImg);

        await news.update({ coverImg: null });
        news.coverImg = null;

        return news;
    }

    async changeCover(dto: ChangeCoverDto, files: { coverImg: Express.Multer.File[] }) {
        const coverImg = files?.coverImg?.[0];

        if (!coverImg) {
            throw new HttpException('required coverImg', HttpStatus.BAD_REQUEST);
        }

        const news = await this.newsRepository.findOne({ where: { id: dto.newsId }});

        if (!news) {
            throw new HttpException('the news with this newsId not found', HttpStatus.BAD_REQUEST);
        }

        if (news.coverImg) {
            await this.fileService.deleteImage(news.coverImg);
        }

        const newCoverImg = await this.fileService.createImage(coverImg);

        await news.update({ coverImg: newCoverImg });

        return {
            fileName: newCoverImg,
        };
    }

    async hide(dto: HideNewsDto) {
        const news = await this.newsRepository.findOne({ where: { id: dto.newsId }});

        if(!news) {
            throw new HttpException('the news with this newsId not found', HttpStatus.BAD_REQUEST)
        }

        if(!news.published) {
            throw new HttpException('the news has already been hided', HttpStatus.BAD_REQUEST)
        }

        await news.update({ published: false });
        news.published = false;

        return news;
    }

    // Полные данные
    async getAll() {
        return await this.newsRepository.findAll({
            order: [
                ['timestamp', 'DESC']
            ]
        });
    }

    // Данные без объединения
    async getPart(dto: GetNewsPartDto) {
        const limit = Number(dto.limit);
        const page = Number(dto.page);
        const order = dto.order ? dto.order : 'DESC';

        const mainNewsId = await this.newsRepository.findOne({
            order: [['timestamp', 'DESC']],
            attributes: ['id'],
            where: {
                published: true,
            }
        });

        if (!mainNewsId) {
            return [];
        }

        const offset = (limit * page) - limit;

        if (dto.search) {
            return await this.newsRepository.findAll({
                offset: offset,
                limit: limit,
                where: {
                    published: true,
                    [Op.or]: {
                        title: {
                            [Op.iLike]: `%${dto.search}%`
                        },
                        description: {
                            [Op.iLike]: `%${dto.search}%`
                        },
                    },
                    id: {
                        [Op.ne]: mainNewsId.id
                    }
                },
                order: [['timestamp', order]],
            });
        }

        return await this.newsRepository.findAll({
            offset: offset,
            limit: limit,
            where: {
                published: true,
                id: {
                    [Op.ne]: mainNewsId.id
                }
            },
            order: [['timestamp', order]],
        });
    }

    async getAdminPart(dto: GetNewsAdminPartDto) {
        const limit = Number(dto.limit);
        const page = Number(dto.page);
        const order = dto.order ? dto.order : 'DESC';

        const offset = (limit * page) - limit;

        if (dto.search) {
            return await this.newsRepository.findAll({
                offset: offset,
                limit: limit,
                where: {
                    [Op.or]: {
                        title: {
                            [Op.iLike]: `%${dto.search}%`
                        },
                        description: {
                            [Op.iLike]: `%${dto.search}%`
                        },
                    },
                },
                order: [['timestamp', order]],
            });
        }

        return await this.newsRepository.findAll({
            offset: offset,
            limit: limit,
            order: [['timestamp', order]],
        });
    }

    async getMain() {
        return await this.newsRepository.findOne({
            order: [['timestamp', 'DESC']],
            where: {
                published: true,
            }
        });
    }

    // Одна полная сущность по id
    async findOne(newsId: number) {
        return await this.newsRepository.findOne({ where: { id: newsId }, include: {all: true}});
    }

    async getSome() {
        return await this.newsRepository.findAll({ limit: 6, order: [['timestamp', 'DESC']], where: { published: true } });
    }

    async getFullNews(dto: GetFullNewsDto) {
        const news = await this.newsRepository.findOne({ where: { id: dto.newsId }, include: {all: true}});

        if (news && news.paragraphs) {
            news.paragraphs = news.paragraphs.sort((a, b) => a.position - b.position);
        }
        return news;
    }
}
