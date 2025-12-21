import {Column, DataType, Model, Table} from "sequelize-typescript";

interface competitionCreationAttrs {
    name: string;
    description: string;
}

@Table({tableName: 'competitions'})
export class Competition extends Model<Competition, competitionCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.TEXT, allowNull: false})
    description: string;
}