import {forwardRef, Module} from '@nestjs/common';
import {ServicesController} from './services.controller';
import {ServicesService} from './services.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {FilesModule} from "../files/files.module";
import {Service} from "./services.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [
    SequelizeModule.forFeature([Service]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
      ServicesService,
  ],
})
export class ServicesModule {}
