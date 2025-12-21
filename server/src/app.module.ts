import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import * as process from "node:process";
import {NewsModule} from './news/news.module';
import {ParagraphsModule} from './paragraphs/paragraphs.module';
import {News} from "./news/news.model";
import {Paragraph} from "./paragraphs/paragraphs.model";
import {FilesModule} from "./files/files.module";
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";
import {MembersModule} from './members/members.module';
import {Member} from "./members/members.model";
import {VacanciesModule} from './vacancies/vacancies.module';
import {Vacancy} from "./vacancies/vacancies.model";
import {CompetitionsModule} from "./competitions/competitions.module";
import {Competition} from "./competitions/competitions.model";
import {ActsModule} from "./acts/acts.module";
import {Act} from "./acts/acts.model";
import {Service} from "./services/services.model";
import {ServicesModule} from "./services/services.module";
import {Order} from "./orders/orders.model";
import {OrdersModule} from "./orders/orders.module";
import {AdminsModule} from "./admins/admins.module";
import {Admin} from "./admins/admins.model";
import {AuthModule} from './auth/auth.module';
import {ContentCard} from "./contentCard/contentCard.model";
import {ContentCardModule} from "./contentCard/contentCard.module";
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
    imports: [
        SequelizeModule.forRoot({
            dialect: process.env.DB_DIALECT as undefined,
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
                News,
                Paragraph,
                Member,
                Vacancy,
                Competition,
                Act,
                Service,
                Order,
                Admin,
                ContentCard,
            ],
            autoLoadModels: true,
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 60,
        }),
        ParagraphsModule,
        NewsModule,
        FilesModule,
        MembersModule,
        VacanciesModule,
        CompetitionsModule,
        ActsModule,
        ServicesModule,
        OrdersModule,
        AdminsModule,
        AuthModule,
        ContentCardModule,
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: process.env.SMTP_HOST,
                    port: +process.env.SMTP_PORT,
                    secure: true,
                    tls: {
                        rejectUnauthorized: false,
                    },
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                },
                defaults: {
                    from: process.env.EMAIL_FROM,
                    to: process.env.EMAIL_TO
                },
                template: {
                    dir: __dirname + '/../templates',
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
    ],
})
export class AppModule {

}