import {Column, DataType, Model, Table} from "sequelize-typescript";

interface serviceCreationAttrs {
    coverImg?: string;
    name: string;
    price: number;
}

@Table({tableName: 'services'})
export class Service extends Model<Service, serviceCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: true})
    coverImg: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.FLOAT, allowNull: false})
    price: number;
}