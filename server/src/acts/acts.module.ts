import {forwardRef, Module} from '@nestjs/common';
import {ActsController} from './acts.controller';
import {ActsService} from './acts.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Act} from "./acts.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [ActsController],
  providers: [ActsService],
  imports: [
    SequelizeModule.forFeature([Act]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
      ActsService,
  ],
})
export class ActsModule {}
