import {Column, DataType, Model, Table} from "sequelize-typescript";

interface adminCreationAttrs {
    password: string;
    login: string;
}

@Table({tableName: 'admins'})
export class Admin extends Model<Admin, adminCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    login: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.TEXT, allowNull: true})
    refreshToken: string;
}