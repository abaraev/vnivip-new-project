import {forwardRef, Module} from '@nestjs/common';
import {MembersService} from './members.service';
import {MembersController} from './members.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Member} from "./members.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [MembersService],
  controllers: [MembersController],
  imports: [
    SequelizeModule.forFeature([Member]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    MembersService,
  ]
})
export class MembersModule {}
