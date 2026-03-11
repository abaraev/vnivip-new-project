import {Body, Controller, Delete, Get, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dto/create-order.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GetOrderDto} from "./dto/get-order.dto";
import {SetStatusOrderDto} from "./dto/set-status-order.dto";
import {DeleteNewsDto} from "../news/dto/delete-news.dto";

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}


    @UseGuards(JwtAuthGuard)
    @Delete('all')
    deleteAll() {
        return this.ordersService.deleteAll();
    }

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.ordersService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/set-status')
    setStatus(@Body() dto: SetStatusOrderDto) {
        return this.ordersService.setStatus(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.ordersService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/one')
    getFullNews(@Query() dto: GetOrderDto) {
        return this.ordersService.getOne(dto);
    }
}
