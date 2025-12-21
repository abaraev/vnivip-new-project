import {Column, DataType, Model, Table} from "sequelize-typescript";
import {OrderStatus} from "../types/OrderStatus";

interface orderCreationAttrs {
    name: string;
    secondName?: string;
    phone: string;
    email: string;
    cart: string;
    documents?: string;
}

@Table({tableName: 'orders'})
export class Order extends Model<Order, orderCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: true})
    secondName: string;

    @Column({type: DataType.STRING, allowNull: false})
    phone: string;

    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: true})
    comment: string;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: OrderStatus.PENDING})
    status: string;

    @Column({type: DataType.TEXT, allowNull: false})
    cart: string;

    @Column({type: DataType.TEXT, allowNull: true})
    documents: string;
}