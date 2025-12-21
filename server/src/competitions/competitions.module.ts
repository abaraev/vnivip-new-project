import {forwardRef, Module} from '@nestjs/common';
import {CompetitionsController} from './competitions.controller';
import {CompetitionsService} from './competitions.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Competition} from "./competitions.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
  imports: [
      SequelizeModule.forFeature([Competition]),
      forwardRef(() => AuthModule),
  ],
  exports: [
      CompetitionsService,
  ],
})
export class CompetitionsModule {}
