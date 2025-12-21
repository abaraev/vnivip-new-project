import {forwardRef, Module} from '@nestjs/common';
import {NewsService} from './news.service';
import {NewsController} from './news.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {News} from "./news.model";
import {ParagraphsModule} from "../paragraphs/paragraphs.module";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [NewsService],
    controllers: [NewsController],
    imports: [
        SequelizeModule.forFeature([News]),
        forwardRef(() => ParagraphsModule),
        FilesModule,
        forwardRef(() => AuthModule),
    ],
    exports: [
        NewsService,
    ]
})
export class NewsModule {}
