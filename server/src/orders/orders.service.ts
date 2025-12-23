import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateOrderDto} from "./dto/create-order.dto";
import {Order} from "./orders.model";
import {ServicesService} from "../services/services.service";
import {GetOrderDto} from "./dto/get-order.dto";
import {SetStatusOrderDto} from "./dto/set-status-order.dto";
import {MailerService} from "@nestjs-modules/mailer";
import * as path from "path";

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order,
                private mailService: MailerService,
                private servicesService: ServicesService ) {}

    async create(dto: CreateOrderDto) {
        let documents = [];

        if (dto.documents) {
            try {
                documents = JSON.parse(dto.documents);
            } catch (e) {
                throw new HttpException('required documents in JSON format', HttpStatus.BAD_REQUEST);
            }
        }


        let cart;
        try {
            cart = JSON.parse(dto.cart);
        } catch (e) {
            throw new HttpException('required cart in JSON format', HttpStatus.BAD_REQUEST);
        }

        if (!cart.length) {
            throw new HttpException('empty array or object', HttpStatus.BAD_REQUEST);
        }


        const idsArr = [];
        cart?.forEach((service) => {
            if (service.id) {
                return idsArr.push(service.id);
            }
        });

        if (!idsArr.length) {
            throw new HttpException('empty cart', HttpStatus.BAD_REQUEST);
        }

        const ids = idsArr.join(',');

        const services = await this.servicesService.getPart({
            ids: ids,
        })

        const fullCart = services.map((service) => {
            const currentItem = cart.find((item) => item.id === service.id);
            return {
                ...service.dataValues,
                amount: currentItem.amount,
            }
        })

        const newOrder = await this.orderRepository.create({ ...dto, cart: JSON.stringify(fullCart), documents: JSON.stringify(documents)});



        // --------------------------------------
        const fullCartEmail = services.map((service, index) => {
            const currentItem = cart.find((item) => item.id === service.id);
            return {
                ...service.dataValues,
                amount: currentItem.amount,
                totalSum: (currentItem.amount * service.price),
                totalSumStr: (currentItem.amount * service.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& '),
                priceStr: service.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& '),
                index: index + 1,
            }
        })

        let totalSumCartEmail = 0;
        fullCartEmail.map((item) => {
            totalSumCartEmail = totalSumCartEmail + item.totalSum;
        })


        const attachments = documents.map(item => ({
            filename: item.name,
            path: path.resolve(__dirname, '..', '..', 'static', 'documents', item.staticFile),
        }))

        try {

            await this.mailService.sendMail({
                subject: `Заказ №${newOrder.id}, ВНИВИП | Услуги`,
                text: '',
                template: './order',
                context: {
                    cart: fullCartEmail,
                    name: newOrder.name,
                    secondName: newOrder.secondName || '',
                    comment: newOrder.comment || '',
                    phone: newOrder.phone,
                    email: newOrder.email,
                    totalCartSum: totalSumCartEmail.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& '),
                },
                attachments: attachments.length ? attachments : undefined,
            })

            return newOrder;
        } catch (e) {
            throw new HttpException('mail error', HttpStatus.INTERNAL_SERVER_ERROR);
            console.log(e);
        }
    }

    async getAll() {
        return await this.orderRepository.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    async getOne(dto: GetOrderDto) {
        return await this.orderRepository.findOne({ where: { id: dto.orderId }});
    }

    async setStatus(dto: SetStatusOrderDto) {
        const order = await this.orderRepository.findOne({
            where: {
                id: dto.orderId,
            }
        })

        if (!order) {
            throw new HttpException('order with the id not found', HttpStatus.BAD_REQUEST);
        }

        await order.update({ status: dto.status })
        order.status = dto.status;

        return order;
    }
}
