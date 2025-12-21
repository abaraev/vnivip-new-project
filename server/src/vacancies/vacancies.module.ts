import {forwardRef, Module} from '@nestjs/common';
import {VacanciesController} from './vacancies.controller';
import {VacanciesService} from './vacancies.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Vacancy} from "./vacancies.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [VacanciesController],
  providers: [VacanciesService],
  imports: [
    SequelizeModule.forFeature([Vacancy]),
    forwardRef(() => AuthModule),
  ],
  exports: [
      VacanciesService,
  ],
})
export class VacanciesModule {}
