import {forwardRef, Module} from '@nestjs/common';
import {OrdersController} from './orders.controller';
import {OrdersService} from './orders.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Order} from "./orders.model";
import {ServicesModule} from "../services/services.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([Order]),
    ServicesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
      OrdersService,
  ],
})
export class OrdersModule {}
