import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ContentCard} from "./contentCard.model";
import {ContentCardController} from './contentCard.controller';
import {ContentCardService} from './contentCard.service';
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [ContentCardService],
    controllers: [ContentCardController],
    imports: [
        SequelizeModule.forFeature([ContentCard]),
        FilesModule,
        forwardRef(() => AuthModule),
    ],
    exports: [
        ContentCardService,
    ],
})
export class ContentCardModule {}
